# API Documentation

## Overview

This document outlines the API architecture and available endpoints for the React Starter Kit. Currently, the application serves as a Single Page Application (SPA) with Rails providing the foundation for future API development.

## Current API Structure

### Health Check Endpoint

#### GET /up
Rails health check endpoint for monitoring application status.

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/plain

Rails is up and running
```

**Usage:**
```bash
curl http://localhost:3000/up
```

**Response Codes:**
- `200 OK` - Application is healthy
- `500 Internal Server Error` - Application has issues

### SPA Fallback Route

#### GET /*
Serves the React application for all HTML requests.

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <!-- React application -->
</html>
```

**Route Configuration:**
```ruby
# config/routes.rb
get "*path", to: "application#index", constraints: ->(request) { request.format.html? }
root "application#index"
```

## API Development Guidelines

### RESTful API Design

For future API endpoints, follow these conventions:

#### Resource Naming
```
GET    /api/v1/users          # List users
POST   /api/v1/users          # Create user
GET    /api/v1/users/:id      # Show user
PATCH  /api/v1/users/:id      # Update user
DELETE /api/v1/users/:id      # Delete user
```

#### API Versioning
```ruby
# config/routes.rb
namespace :api do
  namespace :v1 do
    resources :users
    resources :posts
  end
end
```

### Request/Response Format

#### Standard JSON Response Structure
```json
{
  "status": "success|error",
  "data": {
    // Response data
  },
  "message": "Optional message",
  "errors": {
    // Validation errors (if any)
  },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

#### Success Response Example
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

#### Error Response Example
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "email": ["can't be blank", "is invalid"],
    "name": ["can't be blank"]
  }
}
```

### Authentication & Authorization

#### JWT Authentication Setup

Add to Gemfile:
```ruby
gem 'jwt'
gem 'bcrypt'
```

#### JWT Helper Methods
```ruby
# app/lib/json_web_token.rb
class JsonWebToken
  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(decoded)
  end
end
```

#### Authentication Controller
```ruby
# app/controllers/api/v1/auth_controller.rb
class Api::V1::AuthController < Api::V1::BaseController
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: {
        status: 'success',
        data: {
          token: token,
          user: user.as_json(except: [:password_digest])
        }
      }
    else
      render json: {
        status: 'error',
        message: 'Invalid credentials'
      }, status: :unauthorized
    end
  end

  def register
    user = User.new(user_params)

    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: {
        status: 'success',
        data: {
          token: token,
          user: user.as_json(except: [:password_digest])
        }
      }, status: :created
    else
      render json: {
        status: 'error',
        message: 'Registration failed',
        errors: user.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
```

#### Authentication Middleware
```ruby
# app/controllers/concerns/authenticatable.rb
module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request
  end

  private

  def authenticate_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    begin
      decoded = JsonWebToken.decode(header)
      @current_user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: {
        status: 'error',
        message: 'User not found'
      }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: {
        status: 'error',
        message: 'Invalid token'
      }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
```

### API Base Controller

```ruby
# app/controllers/api/v1/base_controller.rb
class Api::V1::BaseController < ActionController::API
  include Authenticatable

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from ActionController::ParameterMissing, with: :bad_request

  private

  def not_found(exception)
    render json: {
      status: 'error',
      message: 'Record not found'
    }, status: :not_found
  end

  def unprocessable_entity(exception)
    render json: {
      status: 'error',
      message: 'Validation failed',
      errors: exception.record.errors
    }, status: :unprocessable_entity
  end

  def bad_request(exception)
    render json: {
      status: 'error',
      message: 'Bad request',
      errors: { parameter: [exception.message] }
    }, status: :bad_request
  end
end
```

## Example API Implementation

### User Management API

#### User Model
```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  def as_json(options = {})
    super(options.merge(except: [:password_digest]))
  end
end
```

#### User Controller
```ruby
# app/controllers/api/v1/users_controller.rb
class Api::V1::UsersController < Api::V1::BaseController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    users = User.page(params[:page]).per(params[:per_page] || 20)

    render json: {
      status: 'success',
      data: users.as_json,
      meta: {
        page: users.current_page,
        per_page: users.limit_value,
        total: users.total_count,
        total_pages: users.total_pages
      }
    }
  end

  def show
    render json: {
      status: 'success',
      data: @user.as_json
    }
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: {
        status: 'success',
        data: user.as_json
      }, status: :created
    else
      render json: {
        status: 'error',
        message: 'User creation failed',
        errors: user.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: {
        status: 'success',
        data: @user.as_json
      }
    else
      render json: {
        status: 'error',
        message: 'User update failed',
        errors: @user.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    render json: {
      status: 'success',
      message: 'User deleted successfully'
    }
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
```

### Database Migration
```ruby
# db/migrate/001_create_users.rb
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
```

## Frontend API Integration

### API Client Setup

```typescript
// app/frontend/lib/api.ts
const API_BASE_URL = '/api/v1'

interface ApiResponse<T> {
  status: 'success' | 'error'
  data?: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.token = localStorage.getItem('auth_token')
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  removeToken() {
    this.token = null
    localStorage.removeItem('auth_token')
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient()
```

### React Hooks for API

```typescript
// app/frontend/hooks/useApi.ts
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(endpoint: string): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const response = await api.get<T>(endpoint)

        if (response.status === 'success') {
          setState({ data: response.data!, loading: false, error: null })
        } else {
          setState({ data: null, loading: false, error: response.message || 'API error' })
        }
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    fetchData()
  }, [endpoint])

  return state
}

export function useApiMutation<T, P = any>() {
  const [state, setState] = useState<UseApiState<T> & { isSubmitting: boolean }>({
    data: null,
    loading: false,
    error: null,
    isSubmitting: false,
  })

  const mutate = async (
    endpoint: string,
    data: P,
    method: 'POST' | 'PATCH' | 'DELETE' = 'POST'
  ) => {
    try {
      setState(prev => ({ ...prev, isSubmitting: true, error: null }))

      let response
      switch (method) {
        case 'POST':
          response = await api.post<T>(endpoint, data)
          break
        case 'PATCH':
          response = await api.patch<T>(endpoint, data)
          break
        case 'DELETE':
          response = await api.delete<T>(endpoint)
          break
      }

      if (response.status === 'success') {
        setState({
          data: response.data!,
          loading: false,
          error: null,
          isSubmitting: false
        })
        return response.data
      } else {
        setState({
          data: null,
          loading: false,
          error: response.message || 'API error',
          isSubmitting: false
        })
        throw new Error(response.message || 'API error')
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        isSubmitting: false
      })
      throw error
    }
  }

  return { ...state, mutate }
}
```

### Usage Example

```typescript
// app/frontend/components/UserList.tsx
import { useApi, useApiMutation } from '@/hooks/useApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export function UserList() {
  const { data: users, loading, error } = useApi<User[]>('/users')
  const { mutate: deleteUser, isSubmitting } = useApiMutation()

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(`/users/${userId}`, {}, 'DELETE')
      // Refresh the list or update state
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      {users?.map(user => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{user.email}</p>
            <Button
              variant="destructive"
              size="sm"
              disabled={isSubmitting}
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## API Testing

### RSpec API Tests

```ruby
# spec/requests/api/v1/users_spec.rb
require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let(:user) { create(:user) }
  let(:auth_token) { JsonWebToken.encode(user_id: user.id) }
  let(:headers) { { 'Authorization' => "Bearer #{auth_token}" } }

  describe 'GET /api/v1/users' do
    before { create_list(:user, 3) }

    it 'returns users list' do
      get '/api/v1/users', headers: headers

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['status']).to eq('success')
      expect(JSON.parse(response.body)['data'].length).to eq(4) # 3 + authenticated user
    end
  end

  describe 'POST /api/v1/users' do
    let(:valid_params) do
      {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          password_confirmation: 'password123'
        }
      }
    end

    it 'creates a user' do
      expect {
        post '/api/v1/users', params: valid_params, headers: headers
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)['status']).to eq('success')
    end

    it 'returns validation errors for invalid data' do
      invalid_params = valid_params.dup
      invalid_params[:user][:email] = ''

      post '/api/v1/users', params: invalid_params, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
  end
end
```

### Factory Bot Setup

```ruby
# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { 'password123' }
    password_confirmation { 'password123' }
  end
end
```

### Frontend API Testing

```typescript
// app/frontend/__tests__/api.test.ts
import { api } from '@/lib/api'

// Mock fetch
global.fetch = jest.fn()

describe('API Client', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  it('makes GET requests correctly', async () => {
    const mockResponse = { status: 'success', data: { id: 1, name: 'Test' } }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await api.get('/users/1')

    expect(fetch).toHaveBeenCalledWith('/api/v1/users/1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    expect(result).toEqual(mockResponse)
  })

  it('includes auth token when available', async () => {
    api.setToken('test-token')

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'success' }),
    })

    await api.get('/users')

    expect(fetch).toHaveBeenCalledWith('/api/v1/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token',
      },
    })
  })
})
```

## API Documentation Tools

### OpenAPI/Swagger Setup

Add to Gemfile:
```ruby
gem 'rswag'
```

Generate Swagger documentation:
```ruby
# spec/swagger_helper.rb
RSpec.configure do |config|
  config.swagger_root = Rails.root.join('swagger').to_s
  config.swagger_docs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'React Starter Kit API',
        version: 'v1',
        description: 'API documentation for React Starter Kit'
      },
      paths: {},
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ]
    }
  }
end
```

This API documentation provides a foundation for building robust APIs with the React Starter Kit. The modular structure allows for easy extension and integration with the existing React frontend.
