# frozen_string_literal: true

module Api
  module V1
    class RolesController < BaseController
      before_action :check_admin_permission
      before_action :set_role, only: [:show, :update, :destroy]

      def index
        roles = Role.all
        render_success({
          roles: roles.map { |role| role_serializer(role) }
        }, "Roles retrieved successfully")
      end

      def show
        render_success({
          role: role_serializer(@role)
        }, "Role retrieved successfully")
      end

      def create
        role = Role.new(role_params)

        if role.save
          render_success({
            role: role_serializer(role)
          }, "Role created successfully", :created)
        else
          render_error("Creation failed", :unprocessable_entity, role.errors.messages)
        end
      end

      def update
        if @role.update(role_params)
          render_success({
            role: role_serializer(@role)
          }, "Role updated successfully")
        else
          render_error("Update failed", :unprocessable_entity, @role.errors.messages)
        end
      end

      def destroy
        if @role.destroy
          render_success({}, "Role deleted successfully")
        else
          render_error("Delete failed", :unprocessable_entity, @role.errors.messages)
        end
      end

      private

      def set_role
        @role = Role.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render_error("Role not found", :not_found)
      end

      def role_params
        params.permit(:name, :description)
      end

      def check_admin_permission
        unless current_user.admin?
          render_error("Admin access required", :forbidden)
        end
      end

      def role_serializer(role)
        {
          id: role.id,
          name: role.name,
          description: role.description,
          created_at: role.created_at,
          updated_at: role.updated_at
        }
      end
    end
  end
end
