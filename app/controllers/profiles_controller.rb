# app/controllers/profiles_controller.rb
class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user

    hours_learned = @user.participated_sessions.joins(:event).sum("EXTRACT(EPOCH FROM (events.end_time - events.start_time))") / 3600.0
    recent_activities = @user.participated_sessions.order(created_at: :desc).limit(5).map do |session|
      {
        type: "session",
        title: "Participaste en la sesión: #{session.title}",
        date: "Creada el #{session.created_at.strftime('%d de %b, %Y')}"
      }
    end

    @react_props = {
      i18n: t("my_profile_page"),

      user_data: {
        # --- Datos Básicos ---
        email: @user.email,
        first_name: @user.first_name,
        last_name: @user.last_name,
        role: User::ROLES.key(@user.role).to_s.titleize,
        bio: @user.bio,

        # --- Campos del Perfil ---
        phone: @user.phone,
        country: @user.country,
        website: @user.website,
        university: @user.university,
        linkedin_url: @user.linkedin_url,
        github_url: @user.github_url,

        # --- Asociaciones ---
        interests: @user.interests.map { |i| { id: i.id, name: i.name } },
        badges: @user.badges.map { |b| { id: b.id, name: b.name, description: b.description } },

        # --- Configuraciones de Privacidad ---
        privacy: {
          profile_visibility: User::PROFILE_VISIBILITY.key(@user.profile_visibility).to_s,
          show_email: @user.show_email,
          show_phone: @user.show_phone,
          show_activity: @user.show_activity,
          allow_messages: @user.allow_messages
        },

        # --- Datos Calculados (Estadísticas) ---
        stats: {
          sessions_joined: @user.participated_sessions.count,
          sessions_created: @user.created_sessions.count,
          rating: @user.received_feedbacks.average(:rating)&.round(1) || 0,
          achievements: @user.badges.count,
          hours_learned: hours_learned.round(1),
          connections: 0 # Placeholder por ahora
        },

        # --- Datos Derivados (Actividad Reciente) ---
        recent_activity: recent_activities
      }
    }
  end

  def edit
    show
    render :show
  end

  def update
    # Lógica para recibir los datos del formulario de edición y actualizar al current_user
  end
end
