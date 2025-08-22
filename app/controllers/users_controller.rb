# app/controllers/users_controller.rb
class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    # @users = User.where.not(role: User::ROLES[:admin]).where.not(id: current_user.id).includes(:interests)

    @users = User.where.not(role: User::ROLES[:admin])
                 .where.not(id: current_user.id)
                 .includes(:interests) # Preload interests to solve the other N+1
                 .left_joins(:participated_sessions) # Join to count sessions
                 .group("users.id") # Group by user to count correctly
                 .select("users.*", "COUNT(sessions_users.session_id) AS sessions_joined_count")

    respond_to do |format|
      # format.json do
      #   render json: @users.map { |user|
      #     {
      #       id: user.id,
      #       first_name: user.first_name,
      #       last_name: user.last_name,
      #       email: user.email,
      #       role: User::ROLES.key(user.role),
      #       # Placeholder para datos que aún no tienes en el modelo
      #       rating: 4.8,
      #       sessions: user.participated_sessions.count,
      #       # Incluimos los intereses para el filtrado
      #       topInterests: user.interests.limit(3).pluck(:name)
      #     }
      #   }
      # end

      format.json do
        # The controller is now simple and clean.
        render json: UserSerializer.new(@users).serializable_hash[:data].map { |item| item[:attributes] }
      end
    end
  end

  def show
    @user = User.find(params[:id])

    @react_props = {
      i18n: t("user_profile_page", name: @user.first_name),
      is_current_user: (current_user == @user),
      user_data: {
        id: @user.id,
        full_name: "#{@user.first_name} #{@user.last_name}",
        first_name: @user.first_name,
        last_name: @user.last_name,
        email: @user.email,
        role: User::ROLES.key(@user.role),
        bio: @user.bio,
        linkedin_url: @user.linkedin_url,
        github_url: @user.github_url,
        interests: @user.interests.select(:id, :name),
        badges: @user.badges.select(:id, :name, :description),
        feedbacks: @user.received_feedbacks.includes(:giver).map do |f|
          { id: f.id, giver_name: "#{f.giver.first_name} #{f.giver.last_name}", rating: f.rating, comment: f.comment }
        end
      }
    }
  end
end
