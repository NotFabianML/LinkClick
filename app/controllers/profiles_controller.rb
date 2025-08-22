class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    # @user = current_user

    @user = User.includes(:interests, :badges, :participated_sessions, :created_sessions, received_feedbacks: :giver).find(current_user.id)

    # hours_learned = @user.participated_sessions.joins(:event).sum("EXTRACT(EPOCH FROM (events.end_time - events.start_time))") / 3600.0
    # recent_activities = @user.participated_sessions.order(created_at: :desc).limit(5).map do |session|
    #   {
    #     type: "session",
    #     title: "Participaste en la sesión: #{session.title}",
    #     date: "Creada el #{session.created_at.strftime('%d de %b, %Y')}"
    #   }
    # end

    # @react_props = {
    #   i18n: t("my_profile_page"),

    #   user_data: {
    #     # --- Basic data ---
    #     email: @user.email,
    #     first_name: @user.first_name,
    #     last_name: @user.last_name,
    #     role: User::ROLES.key(@user.role).to_s.titleize,
    #     bio: @user.bio,

    #     # --- Profile Fields ---
    #     phone: @user.phone,
    #     country: @user.country,
    #     website: @user.website,
    #     university: @user.university,
    #     linkedin_url: @user.linkedin_url,
    #     github_url: @user.github_url,

    #     # --- Associations ---
    #     interests: @user.interests.map { |i| { id: i.id, name: i.name } },
    #     badges: @user.badges.map { |b| { id: b.id, name: b.name, description: b.description } },

    #     # --- Settings ---
    #     settings: {
    #       email_notifications: @user.email_notifications,
    #       session_reminders: @user.session_reminders,
    #       connection_requests: @user.connection_requests,
    #       marketing_emails: @user.marketing_emails
    #     },

    #     # --- Privacy Settings ---
    #     privacy: {
    #       profile_visibility: User::PROFILE_VISIBILITY.key(@user.profile_visibility).to_s,
    #       show_email: @user.show_email,
    #       show_phone: @user.show_phone,
    #       show_activity: @user.show_activity,
    #       allow_messages: @user.allow_messages
    #     },

    #     # --- Calculated Data (Statistics) ---
    #     stats: {
    #       sessions_joined: @user.participated_sessions.count,
    #       sessions_created: @user.created_sessions.count,
    #       rating: @user.received_feedbacks.average(:rating)&.round(1) || 0,
    #       achievements: @user.badges.count,
    #       hours_learned: hours_learned.round(1),
    #       connections: 0
    #     },

    #     recent_activity: recent_activities
    #   }
    # }

    @react_props = {
      i18n: t("my_profile_page"),
      user_data: UserSerializer.new(@user, include: [ :interests, :badges ]).serializable_hash
    }
  end

  def edit
    show
    render :show
  end

  def update
    settings_params = profile_params[:settings] || {}
    privacy_params = profile_params[:privacy] || {}

    user_params = profile_params.except(:settings, :privacy)
                                .merge(settings_params)
                                .merge(privacy_params)

    if current_user.update(user_params)
      render json: { message: "Profile updated successfully!" }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    user_to_delete = current_user
    sign_out(user_to_delete)

    if user_to_delete.destroy
      render json: { message: "Account deleted successfully." }, status: :ok
    else
      render json: { errors: [ "Could not delete account." ] }, status: :unprocessable_entity
    end
  end

  private

  # --- STRONG PARAMETERS ---
  def profile_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :bio,
      :phone,
      :country,
      :website,
      :university,
      :linkedin_url,
      :github_url,

      settings: [
        :email_notifications,
        :session_reminders,
        :connection_requests,
        :marketing_emails
      ],

      privacy: [
        :profile_visibility,
        :show_email,
        :show_phone,
        :show_activity,
        :allow_messages
      ]
    )
  end
end
