# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  belongs_to :role, optional: true
  has_many :sessions, dependent: :destroy

  validates :name, presence: true, length: {minimum: 2, maximum: 50}
  validates :email, presence: true, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :password, length: {minimum: 8}, if: -> { new_record? || !password.nil? }

  before_validation :normalize_email
  scope :verified, -> { where(verified: true) }
  scope :unverified, -> { where(verified: false) }

  def admin?
    role&.name == "admin"
  end

  def moderator?
    role&.name == "moderator"
  end

  def user?
    role&.name == "user" || role.nil?
  end

  def full_name
    name
  end

  def display_name
    name.presence || email.split("@").first
  end

  private

  def normalize_email
    self.email = email.downcase.strip if email.present?
  end
end
