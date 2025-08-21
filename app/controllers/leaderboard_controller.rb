class LeaderboardController < ApplicationController
  before_action :authenticate_user!

  def index
    time_period = params[:period] || "monthly"

    respond_to do |format|
      # 1. Para la petición HTML (carga inicial de la página)
      format.html do
        @react_props = {
          i18n: t("leaderboard_page"),
          # Opcional pero recomendado: Pasa los datos iniciales para evitar
          # una llamada extra al cargar la página.
          leaderboard_data: {
            topLearners: User.top_learners(time_period),
            topTeachers: User.top_teachers(time_period),
            mostActive: User.most_active(time_period)
          },
          current_user_stats: {},
          achievements: []
        }
        # Renderiza app/views/leaderboard/index.html.erb
      end

      # 2. Para la petición JSON (llamadas de Axios desde React)
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
