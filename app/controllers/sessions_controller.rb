class SessionsController < ApplicationController
  before_action :authenticate_user!

  # before_action :set_session, only: %i[ show join notepad ]

  # now we use load_and_authorize_resource from cancancan
  load_and_authorize_resource

  def index
    respond_to do |format|
      format.html do
        @react_props = {
          i18n: t("discover_sessions_page"),
          available_skills: Interest.all.select(:id, :name).as_json
        }
      end

      format.json do
        @sessions = Session.where(status: Session::STATUS[:published]).where.not(creator: current_user).includes(:creator, :event, :participants)

        render json: @sessions.map { |session|
          {
            id: session.id,
            title: session.title,
            description: session.description,
            host: "#{session.creator.first_name} #{session.creator.last_name}",
            host_avatar: "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=#{session.creator.email}",
            host_initials: "#{session.creator.first_name&.first}#{session.creator.last_name&.first}",
            host_rating: 4.8, # Placeholder
            date: session.start_date&.strftime("%Y-%m-%d") || "N/A",
            time: session.start_time&.strftime("%I:%M %p") || "N/A",
            duration: "#{session.duration || 2} hours", # Placeholder
            type: session.session_type,
            difficulty: session.difficulty,
            max_participants: session.max_participants,
            current_participants: session.participants.count,
            skills: [], # Placeholder
            featured: [ true, false ].sample # Placeholder
          }
        }
      end
    end
  end

  def new
    @react_props = {
    i18n: t("create_session_page"),
    available_interests: Interest.all.select(:id, :name).as_json
    }
  end

  def create
    session_attributes = session_params.except(:start_date, :start_time, :duration)
    @session = current_user.created_sessions.build(session_attributes)
    @session.status = Session::STATUS[:published]

    start_date = session_params[:start_date]
    start_time = session_params[:start_time]
    duration_in_hours = session_params[:duration].to_f

    if start_date.present? && start_time.present?
      begin
        event_start_time = DateTime.parse("#{start_date} #{start_time}")
        event_end_time = event_start_time + duration_in_hours.hours

        @session.build_event(
          start_time: event_start_time,
          end_time: event_end_time
        )
      rescue ArgumentError
        @session.errors.add(:base, "Invalid date or time format.")
      end
    end

    # if @session.save
    #   render json: { redirect_url: session_url(@session) }, status: :created
    # else
    #   render json: { errors: @session.errors.full_messages }, status: :unprocessable_entity
    # end

    if @session.errors.empty? && @session.save
      # Saving the session will also save the associated event
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

      session_data: {
        id: @session.id,
        title: @session.title,
        description: @session.description,
        status: @session.status,

        notepad_content: notepad_resource&.content || "",

        participants: @session.participants.map do |p|
          {
            id: p.id,
            full_name: "#{p.first_name} #{p.last_name}",
            initials: "#{p.first_name&.first}#{p.last_name&.first}",
            is_online: [ true, false ].sample # Placeholder por ahora
          }
        end,

        # messages: @session.messages.includes(:sender).order(created_at: :asc).map do |m|
        #   {
        #     id: m.id,
        #     sender_name: "#{m.sender.first_name} #{m.sender.last_name}",
        #     sender_initials: "#{m.sender.first_name&.first}#{m.sender.last_name&.first}",
        #     content: m.content,
        #     timestamp: m.created_at.strftime("%I:%M %p"),
        #     is_current_user: (m.sender_id == current_user.id)
        #   }
        # end,

        messages: Api::V1::MessageSerializer.new(
        @session.messages.includes(:sender).order(created_at: :asc),
        params: { current_user: current_user }
      ).serializable_hash[:data].map { |item| item[:attributes] },

        event_data: {
          scheduled_date: @session.event&.start_time&.strftime("%B %d, %Y"),
          scheduled_time: "#{@session.event&.start_time&.strftime('%I:%M %p')} - #{@session.event&.end_time&.strftime('%I:%M %p')}"
        }
      },
      current_user_role: {
        is_creator: current_user == @session.creator,
        is_participant: @session.participants.include?(current_user)
      }
    }
  end

  def join
    if @session.creator == current_user || @session.participants.include?(current_user)
      return render json: { message: "You are already part of this session." }, status: :ok
    end

    if @session.requires_approval?
      join_request = JoinRequest.find_or_create_by(user: current_user, session: @session)
      render json: { message: "Your request to join has been sent." }, status: :ok
    else
      @session.participants << current_user
      render json: { message: "Successfully joined the session." }, status: :ok
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Session not found." }, status: :not_found
  end

  def notepad
    notepad_resource = @session.resources.find_or_create_by(resource_type: Resource::RESOURCE_TYPES[:notepad])

    if notepad_resource.update(content: params[:content])
      render json: { message: "Notepad saved successfully." }, status: :ok
    else
      render json: { errors: notepad_resource.errors.full_messages }, status: :unprocessable_entity
    end
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
      :status,
      :difficulty,
      :max_participants,
      :start_date,
      :start_time,
      :duration,
      :is_public,
      :allow_recording,
      :requires_approval,
      interest_ids: []
    )
  end
end
