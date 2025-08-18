class JoinRequest < ApplicationRecord
  belongs_to :user
  belongs_to :session

  STATUS = { pending: 0, approved: 1, denied: 2 }.freeze
  def pending?; self.status == STATUS[:pending]; end
  def approved?; self.status == STATUS[:approved]; end
  def denied?; self.status == STATUS[:denied]; end

  validates :user_id, uniqueness: { scope: :session_id }
end
