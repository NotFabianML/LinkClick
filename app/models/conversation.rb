class Conversation < ApplicationRecord
  has_many :messages, as: :messageable, dependent: :destroy
  has_and_belongs_to_many :participants, class_name: "User", join_table: "conversations_users"
end
