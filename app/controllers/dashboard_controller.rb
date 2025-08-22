class DashboardController < ApplicationController
  def index
    @user = current_user

    dashboard_translations = t("dashboard_page").dup
    dashboard_translations[:welcome_back] = t("dashboard_page.welcome_back", name: @user.first_name)

    common_interest_ids = @user.interest_ids
    suggested_users_query = if common_interest_ids.any?
                              User.where.not(id: @user.id)
                                  .where.not(role: User::ROLES[:admin])
                                  .joins(:interests)
                                  .where(interests: { id: common_interest_ids })
                                  .left_joins(:received_feedbacks)
                                  .group("users.id")
                                  .select("users.*",
                                          "COUNT(interests.id) AS shared_interests_count",
                                          "AVG(feedbacks.rating) AS average_rating")
                                  .order("shared_interests_count DESC")
                                  .limit(3)
    else
                              User.where.not(id: @user.id).order("RANDOM()").limit(3)
    end

    # upcoming_sessions_query = @user.participated_sessions
    #                                .where("status < ?", Session::STATUS[:completed])
    #                                .includes(:participants, :event)
    #                                .limit(3)
    #
    upcoming_sessions_query = Session.left_joins(:participants)
                                     .where("sessions.creator_id = :user_id OR sessions_users.user_id = :user_id", user_id: @user.id)
                                     .where("sessions.status < ?", Session::STATUS[:completed])
                                     .includes(:participants, :event)
                                     .distinct
                                     .order(created_at: :desc)
                                     .limit(3)

    # --- Hours Learned Logic ---
    hours_learned_total = (@user.participated_sessions
                               .joins(:event)
                               .where(status: Session::STATUS[:completed])
                               .sum("EXTRACT(EPOCH FROM (events.end_time - events.start_time))") / 3600.0).round(1)

    @react_props = {
      i18n: dashboard_translations,


      stats: {
        sessions_completed: @user.participated_sessions.where(status: Session::STATUS[:completed]).count,
        hours_learned: hours_learned_total,
        connections: @user.connections.count,
        skills_acquired: @user.interests.count
      },

      upcoming_sessions: UpcomingSessionSerializer.new(upcoming_sessions_query).serializable_hash[:data].map { |item| item[:attributes] },

      # TODO: Implement real data fetching for learning goals
      learning_goals: [],
      # TODO: Implement real data fetching for recent activity
      recent_activity: [],

      suggested_connections: suggested_users_query.map do |connection|
        sessions_count = connection.participated_sessions.count
        {
          id: connection.id,
          name: "#{connection.first_name} #{connection.last_name}",
          role: User::ROLES.key(connection.role),
          avatar: "...",
          initials: "#{connection.first_name&.first}#{connection.last_name&.first}",
          topSkills: connection.interests.limit(2).pluck(:name),
          rating: connection.try(:average_rating)&.round(1) || 0,
          sessions: sessions_count,
          sessions_completed_text: I18n.t("dashboard_page.suggested_connections.sessions_completed_count", count: sessions_count)
        }
      end
    }
  end
end
