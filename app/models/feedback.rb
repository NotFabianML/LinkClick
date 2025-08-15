class Feedback < ApplicationRecord
  belongs_to :giver
  belongs_to :receiver
  belongs_to :session
end
