class Connection < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: "User"

  # --- Enum for Status ---
  STATUS = { pending: 0, accepted: 1, declined: 2, blocked: 3 }.freeze
  def pending?; self.status == STATUS[:pending]; end
  def accepted?; self.status == STATUS[:accepted]; end
  def declined?; self.status == STATUS[:declined]; end
  def blocked?; self.status == STATUS[:blocked]; end

  # --- Validations ---
  # Ensures that a user cannot send a duplicate connection request to the same person.
  validates :user_id, uniqueness: { scope: :friend_id }

  # A validation to prevent a user from connecting with themselves.
  validate :cannot_connect_with_self

  private

  def cannot_connect_with_self
    if user_id == friend_id
      errors.add(:base, "Cannot connect with oneself.")
    end
  end
end
