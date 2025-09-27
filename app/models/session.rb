# frozen_string_literal: true

class Session < ApplicationRecord
  belongs_to :user

  validates :user_agent, presence: true
  validates :ip_address, presence: true

  scope :active, -> { where("created_at > ?", 30.days.ago) }
  scope :expired, -> { where("created_at <= ?", 30.days.ago) }

  def expired?
    created_at <= 30.days.ago
  end

  def active?
    !expired?
  end

  def self.cleanup_expired
    expired.destroy_all
  end
end
