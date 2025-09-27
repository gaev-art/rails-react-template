# frozen_string_literal: true

module Api
  module V1
    class UsersController < BaseController
      before_action :set_user, only: [:show, :update, :destroy]
      before_action :check_admin_permission, only: [:index, :destroy]

      def index
        users = User.includes(:role).all
        render_success({
          users: users.map { |user| user_serializer(user) }
        }, "Users retrieved successfully")
      end

      def show
        render_success({
          user: user_serializer(@user)
        }, "User retrieved successfully")
      end

      def update
        if @user.update(user_params)
          render_success({
            user: user_serializer(@user)
          }, "User updated successfully")
        else
          render_error("Update failed", :unprocessable_entity, @user.errors.messages)
        end
      end

      def destroy
        if @user.destroy
          render_success({}, "User deleted successfully")
        else
          render_error("Delete failed", :unprocessable_entity, @user.errors.messages)
        end
      end

      private

      def set_user
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render_error("User not found", :not_found)
      end

      def user_params
        params.require(:user).permit(:name, :email, :verified, :role_id)
      end

      def check_admin_permission
        unless current_user.admin?
          render_error("Admin access required", :forbidden)
        end
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
