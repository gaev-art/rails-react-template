# frozen_string_literal: true

# Configure CORS for API endpoints
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins do |source, request|
      # Allow requests from same origin (for SPA)
      true if request.origin == request.base_url
    end

    # Allow specific origins in production
    if Rails.env.production?
      origins ENV.fetch("ALLOWED_ORIGINS", "").split(",").map(&:strip)
    else
      # In development, allow localhost origins
      origins "http://localhost:3000", "http://127.0.0.1:3000"
    end

    resource "/api/*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      expose: ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"]
  end
end
