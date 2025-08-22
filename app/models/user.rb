# app/models/user.rb
class User < ApplicationRecord
  include Discard::Model
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

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

  has_many :sent_connections, class_name: "Connection", foreign_key: "user_id", dependent: :destroy
  has_many :received_connections, class_name: "Connection", foreign_key: "friend_id", dependent: :destroy

  has_and_belongs_to_many :conversations, join_table: "conversations_users"

  # --- RANKINGS ---
  def self.top_learners(period = "monthly")
    calculate_rankings(scope_by_period(period, :student), :learner)
  end

  def self.top_teachers(period = "monthly")
    calculate_rankings(scope_by_period(period, :teacher), :teacher)
  end

  def self.most_active(period = "monthly")
    calculate_rankings(scope_by_period(period, :student), :active)
  end

  # --- CONNECTIONS ---
  def connections
    sent_friend_ids = self.sent_connections.where(status: Connection::STATUS[:accepted]).pluck(:friend_id)
    received_friend_ids = self.received_connections.where(status: Connection::STATUS[:accepted]).pluck(:user_id)

    User.where(id: sent_friend_ids + received_friend_ids)
  end

  # Helper method to easily find pending incoming requests.
  def pending_requests
    self.received_connections.pending
  end

  private

  def self.scope_by_period(period, role)
    base_scope = self.where(role: ROLES[role])

    scoped_users = case period
    when "weekly"
      base_scope.joins(:participated_sessions).where("sessions.created_at >= ?", 1.week.ago)
    when "monthly"
      base_scope.joins(:participated_sessions).where("sessions.created_at >= ?", 1.month.ago)
    else
      base_scope
    end

    scoped_users.distinct
  end

  def self.calculate_rankings(users, type)
    ranked_users = users.map do |user|
      points = case type
      when :learner
                 (user.participated_sessions.count * 10) + (user.received_feedbacks.average(:rating).to_f * 20)
      when :teacher
                 (user.created_sessions.count * 20) + (user.received_feedbacks.average(:rating).to_f * 50)
      when :active
                 (user.participated_sessions.count * 15)
      end
      { user: user, points: points.round }
    end

    sorted_users = ranked_users.sort_by { |u| -u[:points] }.first(10)

    sorted_users.map.with_index do |data, index|
      user = data[:user]
      {
        rank: index + 1,
        name: "#{user.first_name} #{user.last_name}",
        avatar: "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=#{user.email}",
        initials: "#{user.first_name&.first}#{user.last_name&.first}",
        points: data[:points],
        change: [ "up", "down", "same" ].sample, # Placeholder
        role: user.role,

        sessionsJoined: type == :learner ? user.participated_sessions.count : nil,
        hoursLearned: type == :learner ? (user.participated_sessions.joins(:event).sum("EXTRACT(EPOCH FROM (events.end_time - events.start_time))") / 3600.0).round(1) : nil,
        sessionsCreated: type == :teacher ? user.created_sessions.count : nil,
        studentsHelped: type == :teacher ? user.created_sessions.joins(:participants).count : nil,
        rating: type == :teacher ? user.received_feedbacks.average(:rating)&.round(1) : nil,
        dailyStreak: type == :active ? [ 5, 12, 28 ].sample : nil, # Placeholder
        weeklyHours: type == :active ? [ 8, 11, 15 ].sample : nil # Placeholder
      }.compact #
    end
  end
end
