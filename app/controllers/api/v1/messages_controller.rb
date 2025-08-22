class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_conversation

  # GET /api/v1/conversations/:conversation_id/messages
  # Returns all messages for a specific conversation.
  def index
    # Eager-load the sender association to prevent N+1 queries.
    messages = @conversation.messages.includes(:sender).order(created_at: :asc)

    options = {
      params: { current_user: current_user }
    }

    render json: Api::V1::MessageSerializer.new(messages, options).serializable_hash
  end

  # POST /api/v1/conversations/:conversation_id/messages
  # Creates a new message in a conversation.
  def create
    message = @conversation.messages.build(message_params.merge(sender: current_user))

    if message.save
      # Serialize the new message into the JSON format the frontend expects.
      options = { params: { current_user: current_user } }
      message_json = Api::V1::MessageSerializer.new(message, options).serializable_hash

      # Broadcast the JSON data to the specific conversation channel.
      # Any client subscribed to this conversation will receive this data instantly.
      ConversationChannel.broadcast_to(@conversation, message_json)

      render json: message_json, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # Find the conversation and ensure the current user is a participant.
  def set_conversation
    # Find the conversation through the current user's associations for security.
    @conversation = current_user.conversations.find_by(id: params[:conversation_id])

    # If the conversation is not found or the user is not a part of it, render an error.
    unless @conversation
      render json: { error: "Conversation not found or access denied." }, status: :not_found
    end
  end

  # Define the strong parameters for creating a message.
  def message_params
    params.require(:message).permit(:content)
  end
end
