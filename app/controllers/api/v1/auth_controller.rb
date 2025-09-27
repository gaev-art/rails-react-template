# frozen_string_literal: true

module Api
  module V1
    class AuthController < BaseController
      skip_before_action :authenticate_user!, only: [:login, :register, :refresh]

      def login
        user = User.find_by(email: login_params[:email])

        if user&.authenticate(login_params[:password])
          if user.verified?
            tokens = JwtService.generate_token_pair(user)
            create_session(user)

            render_success({
              user: user_serializer(user),
              tokens: tokens
            }, "Login successful")
          else
            render_error("Account not verified", :forbidden)
          end
        else
          render_error("Invalid email or password", :unauthorized)
        end
      end

      def register
        user = User.new(register_params)
        user.role = Role.find_by(name: "user") # Assign default role

        if user.save
          tokens = JwtService.generate_token_pair(user)
          create_session(user)

          render_success({
            user: user_serializer(user),
            tokens: tokens
          }, "Registration successful", :created)
        else
          render_error("Registration failed", :unprocessable_entity, user.errors.messages)
        end
      end

      def refresh
        refresh_token = params[:refresh_token]

        if refresh_token.blank?
          return render_error("Refresh token required", :bad_request)
        end

        begin
          tokens = JwtService.refresh_access_token(refresh_token)
          render_success(tokens, "Token refreshed successfully")
        rescue JWT::DecodeError => e
          render_error(e.message, :unauthorized)
        end
      end

      def logout
        if current_user
          current_user.sessions.where(
            user_agent: request.user_agent,
            ip_address: request.remote_ip
          ).destroy_all
        end

        render_success({}, "Logout successful")
      end

      def me
        render_success({
          user: user_serializer(current_user)
        }, "User profile retrieved")
      end

      private

      def login_params
        params.require(:auth).permit(:email, :password)
      end

      def register_params
        params.permit(:name, :email, :password, :password_confirmation)
      end

      def create_session(user)
        user.sessions.create!(
          user_agent: request.user_agent,
          ip_address: request.remote_ip
        )
      end

      def user_serializer(user)
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role&.name,
          verified: user.verified,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      end
    end
  end
end
