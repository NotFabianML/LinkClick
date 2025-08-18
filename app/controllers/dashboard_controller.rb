class DashboardController < ApplicationController
  def index
    @user = current_user

    # TODO: This is a simulation. In a real application, you would have more complex logic
    # to find users with similar interests, etc.
    suggested_users = User.where.not(id: @user.id).limit(3)

    dashboard_translations = t("dashboard_page").dup
    dashboard_translations[:welcome_back] = t("dashboard_page.welcome_back", name: @user.first_name)

    @react_props = {
      i18n: dashboard_translations,


      stats: {
        sessions_completed: @user.participated_sessions.where(status: Session::STATUS[:completed]).count,
        hours_learned: 0, # Placeholder
        connections: 0, # Placeholder
        skills_acquired: @user.interests.count
      },

      upcoming_sessions: @user.participated_sessions.where("status < ?", Session::STATUS[:completed]).includes(:participants).limit(3).map do |session|
        {
          id: session.id,
          title: session.title,
          date: session.event&.start_time&.strftime("%d de %b") || "N/A",
          time: session.event&.start_time&.strftime("%I:%M %p") || "N/A",
          type: session.session_type,
          difficulty: "Intermediate", # Placeholder
          participants: session.participants.map { |p| { name: p.first_name, avatar: "...", initials: "#{p.first_name&.first}" } },

          participants_count_text: I18n.t("dashboard_page.session_card.participants_count", count: session.participants.length)
        }
      end,

      # TODO: Implement real data fetching for these sections
      learning_goals: [],
      recent_activity: [],

      suggested_connections: suggested_users.map do |connection|
        # Simulate the number of completed sessions
        sessions_count = connection.participated_sessions.where(status: :completed).count
        {
          id: connection.id,
          name: "#{connection.first_name} #{connection.last_name}",
          role: connection.role, # Asumiendo que role es un enum
          avatar: "...", # Placeholder
          initials: "#{connection.first_name&.first}#{connection.last_name&.first}",
          topSkills: connection.interests.limit(2).pluck(:name),
          rating: 4.8, # Placeholder
          sessions: sessions_count,
          # Pre-translate the pluralized text
          sessions_completed_text: I18n.t("dashboard_page.suggested_connections.sessions_completed_count", count: sessions_count)
        }
      end
    }
  end
end
