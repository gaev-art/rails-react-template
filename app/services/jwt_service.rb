# frozen_string_literal: true

class JwtService
  SECRET_KEY = Rails.application.secret_key_base || 'your-secret-key'
  ALGORITHM = 'HS256'

  # Access token expires in 15 minutes
  ACCESS_TOKEN_EXPIRY = 15.minutes
  # Refresh token expires in 7 days
  REFRESH_TOKEN_EXPIRY = 7.days

  class << self
    def encode(payload, expiry = ACCESS_TOKEN_EXPIRY)
      payload[:exp] = Time.current.to_i + expiry.to_i
      JWT.encode(payload, SECRET_KEY, ALGORITHM)
    end

    def decode(token)
      decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: ALGORITHM })
      decoded[0]
    rescue JWT::DecodeError, JWT::ExpiredSignature => e
      raise JWT::DecodeError, "Invalid token: #{e.message}"
    end

    def generate_token_pair(user)
      access_payload = {
        user_id: user.id,
        email: user.email,
        role: user.role&.name,
        token_type: 'access'
      }

      refresh_payload = {
        user_id: user.id,
        token_type: 'refresh'
      }

      {
        access_token: encode(access_payload, ACCESS_TOKEN_EXPIRY),
        refresh_token: encode(refresh_payload, REFRESH_TOKEN_EXPIRY),
        token_type: 'Bearer',
        expires_in: ACCESS_TOKEN_EXPIRY.to_i
      }
    end

    def refresh_access_token(refresh_token)
      payload = decode(refresh_token)

      if payload['token_type'] != 'refresh'
        raise JWT::DecodeError, 'Invalid token type'
      end

      user = User.find(payload['user_id'])

      access_payload = {
        user_id: user.id,
        email: user.email,
        role: user.role&.name,
        token_type: 'access'
      }

      {
        access_token: encode(access_payload, ACCESS_TOKEN_EXPIRY),
        token_type: 'Bearer',
        expires_in: ACCESS_TOKEN_EXPIRY.to_i
      }
    end

    def extract_user_from_token(token)
      payload = decode(token)

      if payload['token_type'] != 'access'
        raise JWT::DecodeError, 'Invalid token type'
      end

      User.find(payload['user_id'])
    rescue ActiveRecord::RecordNotFound
      raise JWT::DecodeError, 'User not found'
    end
  end
end
