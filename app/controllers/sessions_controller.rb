class SessionsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_session, only: %i[ show ]

  def index
    @sessions = Session.where(status: Session::STATUS[:published]).where.not(creator: current_user)

    respond_to do |format|
      format.json do
        render json: @sessions.map { |session|
          {
            id: session.id,
            title: session.title,
            description: session.description,
            host: "#{session.creator.first_name} #{session.creator.last_name}",
            host_avatar: "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=#{session.creator.email}",
            host_initials: "#{session.creator.first_name&.first}#{session.creator.last_name&.first}",
            date: session.event&.start_time&.strftime("%Y-%m-%d") || "N/A",
            time: session.event&.start_time&.strftime("%I:%M %p") || "N/A",
            duration: "2 hours", # Placeholder
            type: session.session_type,
            difficulty: "Intermediate", # Placeholder
            current_participants: session.participants.count,
            max_participants: 10, # Placeholder
            skills: [] # Placeholder, lo llenaremos cuando asociemos intereses a sesiones
          }
        }
      end
    end
  end

  def new
    @react_props = {
      available_interests: Interest.all.select(:id, :name).as_json
    }
  end

  def create
    @session = current_user.created_sessions.build(session_params)

    if @session.save
      render json: { redirect_url: session_url(@session) }, status: :created
    else
      render json: { errors: @session.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    can_view = @session.published? || @session.creator == current_user || @session.participants.include?(current_user)
    notepad_resource = @session.resources.find_by(resource_type: Resource::RESOURCE_TYPES[:notepad])

    unless can_view
      redirect_to root_path, alert: "No tienes permiso para ver esta sesión."
      return
    end

    @react_props = {
      i18n: t("session_page"),

      # Pasamos un objeto `session` con todos sus datos anidados
      session_data: {
        id: @session.id,
        title: @session.title,
        description: @session.description,
        status: @session.status,

        # Añadimos el contenido del bloc de notas
        notepad_content: notepad_resource&.content || "", # Enviamos el contenido o un string vacío

        # Cargamos los participantes y sus datos básicos
        participants: @session.participants.map do |p|
          {
            id: p.id,
            full_name: "#{p.first_name} #{p.last_name}",
            initials: "#{p.first_name&.first}#{p.last_name&.first}",
            # En un futuro, podrías tener un campo `is_online` en tu modelo User
            is_online: [ true, false ].sample # Placeholder por ahora
          }
        end,

        # Cargamos los mensajes, incluyendo quién los envió
        messages: @session.messages.includes(:sender).order(created_at: :asc).map do |m|
          {
            id: m.id,
            sender_name: "#{m.sender.first_name} #{m.sender.last_name}",
            sender_initials: "#{m.sender.first_name&.first}#{m.sender.last_name&.first}",
            content: m.content,
            timestamp: m.created_at.strftime("%I:%M %p"),
            is_current_user: (m.sender_id == current_user.id)
          }
        end,

        # En el futuro, aquí cargarías los datos del evento, recursos, etc.
        event_data: {
          scheduled_date: @session.event&.start_time&.strftime("%B %d, %Y"),
          scheduled_time: "#{@session.event&.start_time&.strftime('%I:%M %p')} - #{@session.event&.end_time&.strftime('%I:%M %p')}"
        }
      },
      # --- ESTA ES LA SECCIÓN QUE FALTABA O ERA INCORRECTA ---
      # Aquí calculamos y pasamos el rol del usuario actual en esta sesión.
      current_user_role: {
        is_creator: current_user == @session.creator,
        is_participant: @session.participants.include?(current_user)
      }
    }
  end

  private

  def set_session
    @session = Session.find(params[:id])
  end

  def session_params
    params.require(:session).permit(
      :title,
      :description,
      :session_type,
      :status
    )
  end
end
