# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { "password123" }
    password_confirmation { "password123" }
    verified { true }
    role { association(:role) }

    trait :admin do
      role { association(:role, :admin) }
    end

    trait :moderator do
      role { association(:role, :moderator) }
    end

    trait :unverified do
      verified { false }
    end
  end
end
