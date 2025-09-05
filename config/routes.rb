# frozen_string_literal: true

Rails.application.routes.draw do
  # SPA fallback - все HTML запросы возвращают главную страницу
  get "*path", to: "application#index", constraints: ->(request) { request.format.html? }
  root "application#index"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
