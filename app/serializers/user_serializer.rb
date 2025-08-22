# app/serializers/user_serializer.rb
class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :first_name, :last_name, :email

  attribute :role do |user|
    User::ROLES.key(user.role)
  end

  attribute :sessions do |user|
    user.participated_sessions.count
  end

  attribute :topInterests do |user|
    user.interests.limit(3).pluck(:name)
  end

  # A placeholder for rating, which we will implement later.
  attribute :rating do |user|
    4.8 # Placeholder
  end

  # --- Recent Activity ---
  attribute :recent_activity do |user|
    user.participated_sessions.order(created_at: :desc).limit(5).map do |session|
      {
        type: "session",
        title: "Participated in session: #{session.title}",
        date: "Created on #{session.created_at.strftime('%b %d, %Y')}"
      }
    end
  end

  # --- Detailed Profile Attributes ---
  attributes :bio, :phone, :country, :website, :university, :linkedin_url, :github_url

  # --- Settings Hash ---
  attribute :settings do |user|
    {
      email_notifications: user.email_notifications,
      session_reminders: user.session_reminders,
      connection_requests: user.connection_requests,
      marketing_emails: user.marketing_emails
    }
  end

  # --- Privacy Hash ---
  attribute :privacy do |user|
    {
      profile_visibility: User::PROFILE_VISIBILITY.key(user.profile_visibility).to_s,
      show_email: user.show_email,
      show_phone: user.show_phone,
      show_activity: user.show_activity,
      allow_messages: user.allow_messages
    }
  end

  # --- Calculated Stats Hash ---
  attribute :stats do |user|
    {
      sessions_joined: user.participated_sessions.count,
      sessions_created: user.created_sessions.count,
      rating: user.received_feedbacks.average(:rating)&.round(1) || 0,
      achievements: user.badges.count,
      hours_learned: (user.participated_sessions.joins(:event).sum("EXTRACT(EPOCH FROM (events.end_time - events.start_time))") / 3600.0).round(1),
      connections: 0 # Placeholder
    }
  end

  # --- Associations ---
  has_many :interests, serializer: InterestSerializer
  has_many :badges, serializer: BadgeSerializer
end
