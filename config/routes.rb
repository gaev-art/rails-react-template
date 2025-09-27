# frozen_string_literal: true

Rails.application.routes.draw do
  # Mount Swagger UI only in development and test environments
  if Rails.env.development? || Rails.env.test?
    mount Rswag::Ui::Engine => "/api-docs"
    mount Rswag::Api::Engine => "/api-docs"
  end
  # API routes
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post "auth/login", to: "auth#login"
      post "auth/register", to: "auth#register"
      post "auth/refresh", to: "auth#refresh"
      delete "auth/logout", to: "auth#logout"
      get "auth/me", to: "auth#me"

      # User management routes
      resources :users, only: [:index, :show, :update, :destroy]

      # Role management routes
      resources :roles, only: [:index, :show, :create, :update, :destroy]
    end
  end

  # SPA fallback - все HTML запросы возвращают главную страницу
  get "*path", to: "application#index", constraints: ->(request) { request.format.html? }
  root "application#index"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
