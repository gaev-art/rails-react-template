# frozen_string_literal: true

FactoryBot.define do
  factory :role do
    name { Faker::Internet.unique.username }
    description { Faker::Lorem.sentence }

    trait :admin do
      name { "admin" }
      description { "Administrator role with full access" }
    end

    trait :moderator do
      name { "moderator" }
      description { "Moderator role with limited admin access" }
    end

    trait :user do
      name { "user" }
      description { "Regular user role" }
    end
  end
end
