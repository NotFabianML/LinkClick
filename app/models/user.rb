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

  # Método principal para obtener los mejores estudiantes
  def self.top_learners(period = "monthly")
    calculate_rankings(scope_by_period(period, :student), :learner)
  end

  # Método principal para obtener los mejores profesores
  def self.top_teachers(period = "monthly")
    calculate_rankings(scope_by_period(period, :teacher), :teacher)
  end

  # Método principal para obtener los más activos
  def self.most_active(period = "monthly")
    calculate_rankings(scope_by_period(period, :student), :active)
  end

  private

  # Método privado para aplicar el filtro de tiempo
  def self.scope_by_period(period, role)
    base_scope = self.where(role: ROLES[role])
    case period
    when "weekly"
      # Filtramos por la fecha de creación de la sesión, no de la unión.
      base_scope.joins(:participated_sessions).where("sessions.created_at >= ?", 1.week.ago)
    when "monthly"
      base_scope.joins(:participated_sessions).where("sessions.created_at >= ?", 1.month.ago)
    else # 'all_time'
      base_scope
    end.distinct
  end

  # Método privado central para calcular y formatear los rankings
  def self.calculate_rankings(users, type)
    ranked_users = users.map do |user|
      points = case type
      when :learner
                 (user.participated_sessions.count * 10) + (user.received_feedbacks.average(:rating).to_f * 20)
      when :teacher
                 (user.created_sessions.count * 20) + (user.received_feedbacks.average(:rating).to_f * 50)
      when :active
                 (user.participated_sessions.count * 15) # Simplificado por ahora
      end
      { user: user, points: points.round }
    end

    # Ordena por puntos y formatea la salida para el frontend
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
        # Añadimos los datos específicos para cada tipo de tabla
        sessionsJoined: type == :learner ? user.participated_sessions.count : nil,
        hoursLearned: type == :learner ? (user.participated_sessions.joins(:event).sum("EXTRACT(EPOCH FROM (events.end_time - events.start_time))") / 3600.0).round(1) : nil,
        sessionsCreated: type == :teacher ? user.created_sessions.count : nil,
        studentsHelped: type == :teacher ? user.created_sessions.joins(:participants).count : nil,
        rating: type == :teacher ? user.received_feedbacks.average(:rating)&.round(1) : nil,
        dailyStreak: type == :active ? [ 5, 12, 28 ].sample : nil, # Placeholder
        weeklyHours: type == :active ? [ 8, 11, 15 ].sample : nil # Placeholder
      }.compact # .compact elimina las claves con valor nil
    end
  end
end
