class Session < ApplicationRecord
  belongs_to :creator, class_name: "User"

  has_one :event, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :resources, dependent: :destroy
  has_many :feedbacks, dependent: :destroy

  has_and_belongs_to_many :participants, class_name: "User", join_table: "sessions_users"
end
