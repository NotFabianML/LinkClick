class LeaderboardController < ApplicationController
  before_action :authenticate_user!

  def index
    time_period = params[:period] || "monthly"

    current_user_points = User.calculate_rankings([ current_user ], :learner).first&.dig(:points) || 0
    all_learners = User.top_learners("all_time") # Usamos 'all_time' para un ranking global
    current_user_rank = all_learners.find_index { |u| u[:name].include?(current_user.first_name) }&.+(1) || "N/A"


    respond_to do |format|
      format.html do
        @react_props = {
          i18n: t("leaderboard_page"),
          leaderboard_data: {
            topLearners: User.top_learners(time_period),
            topTeachers: User.top_teachers(time_period),
            mostActive: User.most_active(time_period)
          },
          current_user_stats: {
            totalPoints: current_user_points,
            rank: current_user_rank,
            sessions: current_user.participated_sessions.count,
            nextMilestone: 2500 # TODO: Implement dynamic milestone calculation
          },
          achievements: Achievement.all.as_json(only: [ :name, :description, :icon, :rarity ])
        }
      end

      format.json do
        leaderboard_data = {
          topLearners: User.top_learners(time_period),
          topTeachers: User.top_teachers(time_period),
          mostActive: User.most_active(time_period)
        }
        render json: { leaderboard_data: leaderboard_data }
      end
    end
  end
end
