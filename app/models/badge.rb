class Badge < ApplicationRecord
  has_and_belongs_to_many :users, join_table: "badges_users"
end
