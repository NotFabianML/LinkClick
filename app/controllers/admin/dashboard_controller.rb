class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!

  def index
   users = User.where.not(id: current_user.id).order(created_at: :desc)

    @react_props = {
      i18n: t("admin_page"),
      users: format_users_for_admin(users),
      stats: {
        totalUsers: User.count,
        activeUsers: User.where("created_at >= ?", 30.days.ago).count, # Ejemplo de "activos"
        totalSessions: Session.count,
        sessionsThisWeek: Session.where("created_at >= ?", 7.days.ago).count
      }
    }
  end

  private

  def format_users_for_admin(users)
    users.map do |user|
      {
        id: user.id.to_s,
        name: "#{user.first_name} #{user.last_name}",
        email: user.email,
        role: User::ROLES.key(user.role).to_s.titleize,
        avatar: "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=#{user.email}",
        initials: "#{user.first_name&.first}#{user.last_name&.first}",
        joinDate: user.created_at.strftime("%Y-%m-%d"),
        status: I18n.t("user_status.#{user.discarded? ? 'inactive' : 'active'}"),
        lastActive: user.last_sign_in_at ? "#{time_ago_in_words(user.last_sign_in_at)} ago" : "Never",
        sessionsCreated: user.created_sessions.count,
        sessionsJoined: user.participated_sessions.count,
        rating: user.received_feedbacks.average(:rating)&.round(1) || 0,
        location: user.country || "N/A"
      }
    end
  end

  def authorize_admin!
    redirect_to root_path, alert: "Not authorized." unless current_user.admin?
  end
end
