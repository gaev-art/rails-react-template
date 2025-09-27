# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "Api::V1::Roles", type: :request do
  path "/api/v1/roles" do
    get "List roles" do
      tags "Roles"
      description "Get list of all roles (admin only)"
      produces "application/json"
      security [Bearer: []]

      response "200", "Roles list retrieved" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Roles retrieved successfully"},
            data: {
              type: :object,
              properties: {
                roles: {
                  type: :array,
                  items: {
                    type: :object,
                    properties: {
                      id: {type: :integer, example: 1},
                      name: {type: :string, example: "admin"},
                      description: {type: :string, example: "Administrator role"},
                      created_at: {type: :string, format: :date_time},
                      updated_at: {type: :string, format: :date_time}
                    }
                  }
                }
              }
            }
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        before do
          create_list(:role, 3)
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["roles"]).to be_an(Array)
        end
      end

      response "401", "Unauthorized" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Invalid token"}
          }

        let(:Authorization) { "Bearer invalid-token" }

        run_test!
      end

      response "403", "Forbidden" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Access denied"}
          }

        let(:user) { create(:user) }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test!
      end
    end

    post "Create role" do
      tags "Roles"
      description "Create a new role (admin only)"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      parameter name: :role_data, in: :body, schema: {
        type: :object,
        properties: {
          name: {type: :string, example: "moderator"},
          description: {type: :string, example: "Moderator role"}
        },
        required: %w[name]
      }

      response "201", "Role created" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Role created successfully"},
            data: {
              type: :object,
              properties: {
                id: {type: :integer, example: 1},
                name: {type: :string, example: "moderator"},
                description: {type: :string, example: "Moderator role"},
                created_at: {type: :string, format: :date_time},
                updated_at: {type: :string, format: :date_time}
              }
            }
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }
        let(:role_data) { {name: "moderator", description: "Moderator role"} }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["role"]["name"]).to eq("moderator")
        end
      end

      response "422", "Validation failed" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Role creation failed"},
            errors: {
              type: :object,
              additionalProperties: {
                type: :array,
                items: {type: :string}
              }
            }
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }
        let(:role_data) { {name: ""} }

        run_test!
      end
    end
  end

  path "/api/v1/roles/{id}" do
    get "Get role" do
      tags "Roles"
      description "Get specific role by ID (admin only)"
      produces "application/json"
      security [Bearer: []]

      parameter name: :id, in: :path, type: :integer, required: true, description: "Role ID"

      response "200", "Role retrieved" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Role retrieved successfully"},
            data: {
              type: :object,
              properties: {
                id: {type: :integer, example: 1},
                name: {type: :string, example: "admin"},
                description: {type: :string, example: "Administrator role"},
                created_at: {type: :string, format: :date_time},
                updated_at: {type: :string, format: :date_time}
              }
            }
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:role) { create(:role) }
        let(:id) { role.id }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["role"]["id"]).to eq(role.id)
        end
      end

      response "404", "Role not found" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Record not found"}
          }

        let(:id) { 99999 }
        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test!
      end
    end

    patch "Update role" do
      tags "Roles"
      description "Update role information (admin only)"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      parameter name: :id, in: :path, type: :integer, required: true, description: "Role ID"
      parameter name: :role_data, in: :body, schema: {
        type: :object,
        properties: {
          name: {type: :string, example: "updated-role"},
          description: {type: :string, example: "Updated role description"}
        }
      }

      response "200", "Role updated" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Role updated successfully"},
            data: {
              type: :object,
              properties: {
                id: {type: :integer, example: 1},
                name: {type: :string, example: "updated-role"},
                description: {type: :string, example: "Updated role description"},
                created_at: {type: :string, format: :date_time},
                updated_at: {type: :string, format: :date_time}
              }
            }
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:role) { create(:role) }
        let(:id) { role.id }
        let(:role_data) { {name: "updated-role", description: "Updated description"} }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["role"]["name"]).to eq("updated-role")
        end
      end
    end

    delete "Delete role" do
      tags "Roles"
      description "Delete role (admin only)"
      produces "application/json"
      security [Bearer: []]

      parameter name: :id, in: :path, type: :integer, required: true, description: "Role ID"

      response "200", "Role deleted" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Role deleted successfully"}
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:role) { create(:role) }
        let(:id) { role.id }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(Role.find_by(id: role.id)).to be_nil
        end
      end
    end
  end
end
