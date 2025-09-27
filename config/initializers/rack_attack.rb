# frozen_string_literal: true

# Configure Rack::Attack for rate limiting
class Rack::Attack
  # Configure cache store
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Allow requests from localhost in development
  Rack::Attack.safelist('allow-localhost') do |req|
    '127.0.0.1' == req.ip || '::1' == req.ip
  end

  # Rate limiting for API endpoints
  # 100 requests per minute per IP
  throttle('api/ip', limit: 100, period: 1.minute) do |req|
    req.ip if req.path.start_with?('/api/')
  end

  # Stricter rate limiting for auth endpoints
  # 10 requests per minute per IP for auth
  throttle('auth/ip', limit: 10, period: 1.minute) do |req|
    req.ip if req.path.start_with?('/api/v1/auth/')
  end

  # Rate limiting per user (when authenticated)
  # 1000 requests per hour per user
  throttle('api/user', limit: 1000, period: 1.hour) do |req|
    if req.path.start_with?('/api/') && req.env['rack.attack.user_id']
      req.env['rack.attack.user_id']
    end
  end

  # Block requests from suspicious IPs
  blocklist('block-suspicious-ips') do |req|
    # Add logic to block suspicious IPs if needed
    false
  end

  # Custom response for rate limited requests
  self.throttled_responder = lambda do |env|
    match_data = env['rack.attack.match_data']
    now = match_data[:epoch_time]

    headers = {
      'Content-Type' => 'application/json',
      'X-RateLimit-Limit' => match_data[:limit].to_s,
      'X-RateLimit-Remaining' => '0',
      'X-RateLimit-Reset' => (now + (match_data[:period] - now % match_data[:period])).to_s
    }

    [429, headers, [{ error: 'Rate limit exceeded. Please try again later.' }.to_json]]
  end

  # Log blocked requests
  ActiveSupport::Notifications.subscribe('rack.attack') do |name, start, finish, request_id, payload|
    req = payload[:request]
    Rails.logger.warn "[Rack::Attack] #{req.ip} #{req.request_method} #{req.fullpath} - #{payload[:match_discriminator]}"
  end
end
