# frozen_string_literal: true

require "rails_helper"

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join("swagger").to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    "v1/swagger.yaml" => {
      openapi: "3.0.1",
      info: {
        title: "React Starter Kit API",
        version: "v1",
        description: "RESTful API for React Starter Kit with authentication and user management",
        contact: {
          name: "API Support",
          email: "support@example.com"
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT"
        }
      },
      paths: {},
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server"
        },
        {
          url: "https://api.example.com",
          description: "Production server"
        }
      ],
      components: {
        securitySchemes: {
          Bearer: {
            type: :http,
            scheme: :bearer,
            bearerFormat: "JWT",
            description: "JWT token obtained from /api/v1/auth/login"
          }
        },
        schemas: {
          Error: {
            type: :object,
            properties: {
              success: {type: :boolean, example: false},
              message: {type: :string, example: "Error message"},
              errors: {
                type: :object,
                additionalProperties: {
                  type: :array,
                  items: {type: :string}
                }
              }
            }
          },
          User: {
            type: :object,
            properties: {
              id: {type: :integer, example: 1},
              name: {type: :string, example: "John Doe"},
              email: {type: :string, format: :email, example: "user@example.com"},
              role: {type: [:string, :null], example: "user"},
              verified: {type: :boolean, example: true},
              created_at: {type: :string, format: :date_time},
              updated_at: {type: :string, format: :date_time}
            }
          },
          Role: {
            type: :object,
            properties: {
              id: {type: :integer, example: 1},
              name: {type: :string, example: "admin"},
              description: {type: :string, example: "Administrator role"},
              created_at: {type: :string, format: :date_time},
              updated_at: {type: :string, format: :date_time}
            }
          },
          Tokens: {
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
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
