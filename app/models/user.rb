# app/models/user.rb
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  ROLES = { student: 0, teacher: 1, admin: 2 }.freeze
  def student?; self.role == ROLES[:student]; end
  def teacher?; self.role == ROLES[:teacher]; end
  def admin?; self.role == ROLES[:admin]; end

  PROFILE_VISIBILITY = { public_profile: 0, connections_only: 1, private_profile: 2 }.freeze
  def public_profile?; self.profile_visibility == PROFILE_VISIBILITY[:public_profile]; end
  def connections_only?; self.profile_visibility == PROFILE_VISIBILITY[:connections_only]; end
  def private_profile?; self.profile_visibility == PROFILE_VISIBILITY[:private_profile]; end

  # --- ASOCIACIONES ---
  has_many :created_sessions, class_name: "Session", foreign_key: "creator_id", dependent: :destroy
  has_and_belongs_to_many :participated_sessions, class_name: "Session", join_table: "sessions_users"

  has_many :messages, foreign_key: "sender_id", dependent: :destroy
  has_many :given_feedbacks, class_name: "Feedback", foreign_key: "giver_id", dependent: :destroy
  has_many :received_feedbacks, class_name: "Feedback", foreign_key: "receiver_id", dependent: :destroy

  has_and_belongs_to_many :interests, join_table: "interests_users"
  has_and_belongs_to_many :badges, join_table: "badges_users"

  has_many :join_requests, dependent: :destroy
end
