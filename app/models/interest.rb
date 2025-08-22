class Interest < ApplicationRecord
  has_and_belongs_to_many :users, join_table: "interests_users"
end
