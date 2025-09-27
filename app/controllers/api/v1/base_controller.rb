# frozen_string_literal: true

module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session

      before_action :authenticate_user!

      rescue_from JWT::DecodeError, with: :handle_jwt_error
      rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
      rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error

      private

      def authenticate_user!
        token = extract_token_from_header
        @current_user = JwtService.extract_user_from_token(token)
      rescue JWT::DecodeError
        render json: { error: 'Invalid or expired token' }, status: :unauthorized
      end

      def extract_token_from_header
        auth_header = request.headers['Authorization']
        return nil unless auth_header&.start_with?('Bearer ')

        auth_header.split(' ').last
      end

      def current_user
        @current_user
      end

      def render_success(data = {}, message = 'Success', status = :ok)
        render json: {
          success: true,
          message: message,
          data: data
        }, status: status
      end

      def render_error(message = 'Error', status = :bad_request, errors = {})
        render json: {
          success: false,
          message: message,
          errors: errors
        }, status: status
      end

      def handle_jwt_error(exception)
        render_error(exception.message, :unauthorized)
      end

      def handle_not_found(exception)
        render_error('Resource not found', :not_found)
      end

      def handle_validation_error(exception)
        render_error('Validation failed', :unprocessable_entity, exception.record.errors.messages)
      end
    end
  end
end
