# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "Api::V1::Auth", type: :request do
  path "/api/v1/auth/login" do
    post "Login user" do
      tags "Authentication"
      description "Authenticate user with email and password"
      consumes "application/json"
      produces "application/json"

      parameter name: :auth, in: :body, schema: {
        type: :object,
        properties: {
          auth: {
            type: :object,
            properties: {
              email: {type: :string, format: :email, example: "user@example.com"},
              password: {type: :string, example: "password123"}
            },
            required: %w[email password]
          }
        },
        required: %w[auth]
      }

      parameter name: "User-Agent", in: :header, type: :string, required: false, description: "User agent string"

      response "200", "Login successful" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Login successful"},
            data: {
              type: :object,
              properties: {
                user: {
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
                },
                tokens: {
                  type: :object,
                  properties: {
                    access_token: {type: :string, example: "eyJhbGciOiJIUzI1NiJ9..."},
                    refresh_token: {type: :string, example: "eyJhbGciOiJIUzI1NiJ9..."},
                    token_type: {type: :string, example: "Bearer"},
                    expires_in: {type: :integer, example: 900}
                  }
                }
              }
            }
          }

        let(:user) { create(:user, email: "user@example.com", password: "password123") }
        let(:auth) { {auth: {email: user.email, password: "password123"}} }
        let(:"User-Agent") { "Test Agent" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["user"]["email"]).to eq(user.email)
          expect(data["data"]["tokens"]["access_token"]).to be_present
        end
      end

      response "401", "Invalid credentials" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Invalid email or password"}
          }

        let(:auth) { {auth: {email: "invalid@example.com", password: "wrong"}} }

        run_test!
      end

      response "403", "Account not verified" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Account not verified"}
          }

        let(:user) { create(:user, email: "user@example.com", password: "password123", verified: false) }
        let(:auth) { {auth: {email: user.email, password: "password123"}} }

        run_test!
      end
    end
  end

  path "/api/v1/auth/register" do
    post "Register user" do
      tags "Authentication"
      description "Create a new user account"
      consumes "application/json"
      produces "application/json"

      parameter name: :user_data, in: :body, schema: {
        type: :object,
        properties: {
          name: {type: :string, example: "John Doe"},
          email: {type: :string, format: :email, example: "user@example.com"},
          password: {type: :string, example: "password123"},
          password_confirmation: {type: :string, example: "password123"}
        },
        required: %w[name email password password_confirmation]
      }

      parameter name: "User-Agent", in: :header, type: :string, required: false, description: "User agent string"

      response "201", "Registration successful" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Registration successful"},
            data: {
              type: :object,
              properties: {
                user: {
                  type: :object,
                  properties: {
                    id: {type: :integer, example: 1},
                    name: {type: :string, example: "John Doe"},
                    email: {type: :string, example: "user@example.com"},
                    role: {type: :string, example: "user"},
                    verified: {type: :boolean, example: false},
                    created_at: {type: :string, format: :date_time},
                    updated_at: {type: :string, format: :date_time}
                  }
                },
                tokens: {
                  type: :object,
                  properties: {
                    access_token: {type: :string, example: "eyJhbGciOiJIUzI1NiJ9..."},
                    refresh_token: {type: :string, example: "eyJhbGciOiJIUzI1NiJ9..."},
                    token_type: {type: :string, example: "Bearer"},
                    expires_in: {type: :integer, example: 900}
                  }
                }
              }
            }
          }

        let(:user_data) do
          {
            name: "John Doe",
            email: "newuser@example.com",
            password: "password123",
            password_confirmation: "password123"
          }
        end

        let(:"User-Agent") { "Test Agent" }

        before do
          Role.create!(name: "user", description: "Regular user role")
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["user"]["email"]).to eq("newuser@example.com")
          expect(data["data"]["tokens"]["access_token"]).to be_present
        end
      end

      response "422", "Validation failed" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Registration failed"},
            errors: {
              type: :object,
              additionalProperties: {
                type: :array,
                items: {type: :string}
              }
            }
          }

        let(:user_data) do
          {
            name: "",
            email: "invalid-email",
            password: "123",
            password_confirmation: "456"
          }
        end

        run_test!
      end
    end
  end

  path "/api/v1/auth/refresh" do
    post "Refresh access token" do
      tags "Authentication"
      description "Refresh access token using refresh token"
      consumes "application/json"
      produces "application/json"

      parameter name: :refresh_data, in: :body, schema: {
        type: :object,
        properties: {
          refresh_token: {type: :string, example: "eyJhbGciOiJIUzI1NiJ9..."}
        },
        required: %w[refresh_token]
      }

      response "200", "Token refreshed successfully" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Token refreshed successfully"},
            data: {
              type: :object,
              properties: {
                access_token: {type: :string, example: "eyJhbGciOiJIUzI1NiJ9..."},
                token_type: {type: :string, example: "Bearer"},
                expires_in: {type: :integer, example: 900}
              }
            }
          }

        let(:user) { create(:user) }
        let(:refresh_token) { JwtService.encode({user_id: user.id, token_type: "refresh"}, 7.days) }
        let(:refresh_data) { {refresh_token: refresh_token} }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["access_token"]).to be_present
        end
      end

      response "401", "Invalid refresh token" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: false},
            message: {type: :string, example: "Invalid token: ..."}
          }

        let(:refresh_data) { {refresh_token: "invalid-token"} }

        run_test!
      end
    end
  end

  path "/api/v1/auth/logout" do
    delete "Logout user" do
      tags "Authentication"
      description "Logout user and invalidate session"
      produces "application/json"
      security [Bearer: []]

      response "200", "Logout successful" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "Logout successful"},
            data: {type: :object}
          }

        let(:user) { create(:user) }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test!
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
    end
  end

  path "/api/v1/auth/me" do
    get "Get current user" do
      tags "Authentication"
      description "Get current authenticated user profile"
      produces "application/json"
      security [Bearer: []]

      response "200", "User profile retrieved" do
        schema type: :object,
          properties: {
            success: {type: :boolean, example: true},
            message: {type: :string, example: "User profile retrieved"},
            data: {
              type: :object,
              properties: {
                user: {
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
            }
          }

        let(:user) { create(:user) }
        let(:access_token) { JwtService.encode({user_id: user.id, token_type: "access"}) }
        let(:Authorization) { "Bearer #{access_token}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["success"]).to be true
          expect(data["data"]["user"]["email"]).to eq(user.email)
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
    end
  end
end
