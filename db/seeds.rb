# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create default roles
roles_data = [
  {
    name: "admin",
    description: "Full system access with all permissions"
  },
  {
    name: "moderator",
    description: "Limited administrative access for content moderation"
  },
  {
    name: "user",
    description: "Standard user with basic permissions"
  }
]

roles_data.each do |role_attrs|
  Role.find_or_create_by!(name: role_attrs[:name]) do |role|
    role.description = role_attrs[:description]
  end
end

# Create a default admin user if none exists
admin_role = Role.find_by!(name: "admin")
if User.where(role: admin_role).empty?
  User.create!(
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    password_confirmation: "password123",
    verified: true,
    role: admin_role
  )
  puts "Created default admin user: admin@example.com / password123"
end
