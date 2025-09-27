# frozen_string_literal: true

class Role < ApplicationRecord
  has_many :users, dependent: :nullify

  validates :name, presence: true, uniqueness: true, length: { minimum: 2, maximum: 50 }
  validates :description, length: { maximum: 500 }

  scope :by_name, ->(name) { where(name: name) }

  def admin?
    name == 'admin'
  end

  def moderator?
    name == 'moderator'
  end

  def user?
    name == 'user'
  end


  def self.admin_role
    find_by(name: 'admin')
  end

  def self.moderator_role
    find_by(name: 'moderator')
  end
end
