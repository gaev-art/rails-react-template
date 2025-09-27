# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "Api::V1::Users", type: :request do
  path "/api/v1/users" do
    get "List users" do
      tags "Users"
      description "Get list of all users (admin only)"
      produces "application/json"
      security [Bearer: []]

      parameter name: :page, in: :query, type: :integer, required: false, description: "Page number"
      parameter name: :per_page, in: :query, type: :integer, required: false, description: "Items per page"

      response "200", "Users list retrieved" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Users retrieved successfully"},
            data: {
              type: :array,
              items: {
                type: :object,
                properties: {
                  id: {type: :integer, example: 1},
                  name: {type: :string, example: "John Doe"},
                  email: {type: :string, example: "user@example.com"},
                  role: {type: :string, example: "user"},
                  verified: {type: :boolean, example: true},
                  created_at: {type: :string, format: :date_time},
                  updated_at: {type: :string, format: :date_time}
                }
              }
            },
            meta: {
              type: :object,
              properties: {
                page: {type: :integer, example: 1},
                per_page: {type: :integer, example: 20},
                total: {type: :integer, example: 100},
                total_pages: {type: :integer, example: 5}
              }
            }
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        before do
          create_list(:user, 3)
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]).to be_an(Array)
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
  end

  path "/api/v1/users/{id}" do
    get "Get user" do
      tags "Users"
      description "Get specific user by ID"
      produces "application/json"
      security [Bearer: []]

      parameter name: :id, in: :path, type: :integer, required: true, description: "User ID"

      response "200", "User retrieved" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "User retrieved successfully"},
            data: {
              type: :object,
              properties: {
                id: {type: :integer, example: 1},
                name: {type: :string, example: "John Doe"},
                email: {type: :string, example: "user@example.com"},
                role: {type: :string, example: "user"},
                verified: {type: :boolean, example: true},
                created_at: {type: :string, format: :date_time},
                updated_at: {type: :string, format: :date_time}
              }
            }
          }

        let(:user) { create(:user) }
        let(:id) { user.id }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["id"]).to eq(user.id)
        end
      end

      response "404", "User not found" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Record not found"}
          }

        let(:id) { 99999 }
        let(:user) { create(:user) }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test!
      end
    end

    patch "Update user" do
      tags "Users"
      description "Update user information"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      parameter name: :id, in: :path, type: :integer, required: true, description: "User ID"
      parameter name: :user_data, in: :body, schema: {
        type: :object,
        properties: {
          name: {type: :string, example: "Updated Name"},
          email: {type: :string, format: :email, example: "updated@example.com"}
        }
      }

      response "200", "User updated" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "User updated successfully"},
            data: {
              type: :object,
              properties: {
                id: {type: :integer, example: 1},
                name: {type: :string, example: "Updated Name"},
                email: {type: :string, example: "updated@example.com"},
                role: {type: :string, example: "user"},
                verified: {type: :boolean, example: true},
                created_at: {type: :string, format: :date_time},
                updated_at: {type: :string, format: :date_time}
              }
            }
          }

        let(:user) { create(:user) }
        let(:id) { user.id }
        let(:user_data) { {name: "Updated Name"} }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["name"]).to eq("Updated Name")
        end
      end

      response "422", "Validation failed" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "User update failed"},
            errors: {
              type: :object,
              additionalProperties: {
                type: :array,
                items: {type: :string}
              }
            }
          }

        let(:user) { create(:user) }
        let(:id) { user.id }
        let(:user_data) { {email: "invalid-email"} }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test!
      end
    end

    delete "Delete user" do
      tags "Users"
      description "Delete user (admin only)"
      produces "application/json"
      security [Bearer: []]

      parameter name: :id, in: :path, type: :integer, required: true, description: "User ID"

      response "200", "User deleted" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "User deleted successfully"}
          }

        let(:admin_user) { create(:user, role: create(:role, name: "admin")) }
        let(:user) { create(:user) }
        let(:id) { user.id }
        let(:access_token) { JwtService.encode({user_id: admin_user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(User.find_by(id: user.id)).to be_nil
        end
      end

      response "403", "Forbidden" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Access denied"}
          }

        let(:user) { create(:user) }
        let(:id) { user.id }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test!
      end
    end
  end
end
