class Api::V1::ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations = current_user.conversations.includes(:participants, :messages)

    options = {
      params: { current_user: current_user }
    }

    render json: Api::V1::ConversationSerializer.new(conversations, options).serializable_hash
  end

  # POST /api/v1/conversations
  # Finds or creates a conversation with another user.
  def create
    participant_id = conversation_params[:participant_id]

    # Security check: ensure the participant exists and is not the current user.
    participant = User.find_by(id: participant_id)
    if !participant || participant.id == current_user.id
      return render json: { error: "Invalid participant." }, status: :unprocessable_entity
    end

    # Find existing conversations with only these two participants.
    existing_conversation = current_user.conversations
                                        .joins(:participants)
                                        .group("conversations.id")
                                        .having("COUNT(users.id) = 2")
                                        .where(users: { id: participant_id })
                                        .first

    if existing_conversation
      @conversation = existing_conversation
    else
      # If no conversation exists, create a new one.
      @conversation = Conversation.create
      @conversation.participants << [ current_user, participant ]
    end

    # Return the conversation object, serialized.
    options = { params: { current_user: current_user } }
    render json: Api::V1::ConversationSerializer.new(@conversation, options).serializable_hash, status: :ok
  end

  private

  def conversation_params
    params.require(:conversation).permit(:participant_id)
  end
end
