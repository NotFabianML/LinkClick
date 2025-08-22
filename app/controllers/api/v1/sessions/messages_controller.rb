class Api::V1::Sessions::MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_session

  # GET /api/v1/sessions/:session_id/messages
  def index
    messages = @session.messages.includes(:sender).order(created_at: :asc)
    options = { params: { current_user: current_user } }
    render json: Api::V1::MessageSerializer.new(messages, options).serializable_hash
  end

  # POST /api/v1/sessions/:session_id/messages
  def create
    message = @session.messages.build(message_params.merge(sender: current_user))

    if message.save
      options = { params: { current_user: current_user } }
      message_json = Api::V1::MessageSerializer.new(message, options).serializable_hash

      # Broadcast the new message to the session's channel
      SessionChannel.broadcast_to(@session, message_json)

      render json: message_json, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_session
    @session = Session.find_by(id: params[:session_id])

    # Security check
    unless @session && (@session.creator == current_user || @session.participants.include?(current_user))
      render json: { error: "Session not found or access denied." }, status: :not_found
    end
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
