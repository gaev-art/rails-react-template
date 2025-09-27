# frozen_string_literal: true

class AddRoleToUsers < ActiveRecord::Migration[8.0]
  def change
    add_reference :users, :role, null: true, foreign_key: true
  end
end
