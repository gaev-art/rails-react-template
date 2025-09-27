# frozen_string_literal: true

module AuthenticationHelpers
  def authenticate_user(user = nil)
    user ||= create(:user)
    access_token = JwtService.encode({user_id: user.id, token_type: "access"})
    {"Authorization" => "Bearer #{access_token}"}
  end

  def authenticate_admin
    admin_user = create(:user, :admin)
    access_token = JwtService.encode({user_id: admin_user.id, token_type: "access"})
    {"Authorization" => "Bearer #{access_token}"}
  end
end
