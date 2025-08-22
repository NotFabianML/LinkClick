class Message < ApplicationRecord
  belongs_to :messageable, polymorphic: true
  belongs_to :sender, class_name: "User"
end
