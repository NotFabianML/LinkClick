# app/serializers/api/v1/conversation_serializer.rb
class Api::V1::ConversationSerializer
  include JSONAPI::Serializer

  # Set the type for the JSON:API document
  set_type :conversation

  # Define the attributes based on the ChatConversation TypeScript type.
  attributes :id

  # Custom attribute to get the name of the *other* participant.
  attribute :participantName do |conversation, params|
    # We need the current_user to know who the "other" participant is.
    other_participant = conversation.participants.find { |p| p.id != params[:current_user].id }
    "#{other_participant.first_name} #{other_participant.last_name}" if other_participant
  end

  # Custom attribute for the participant's initials.
  attribute :participantInitials do |conversation, params|
    other_participant = conversation.participants.find { |p| p.id != params[:current_user].id }
    "#{other_participant.first_name&.first}#{other_participant.last_name&.first}" if other_participant
  end

  # For now, avatar is a placeholder.
  attribute :participantAvatarUrl do |conversation, params|
    "/placeholder.svg"
  end

  # Get the content of the most recent message in the conversation.
  attribute :lastMessage do |conversation|
    # .last will be efficient because of the includes in the controller
    conversation.messages.last&.content || "No messages yet."
  end

  # Get the timestamp of the last message.
  attribute :timestamp do |conversation|
    last_msg = conversation.messages.last
    last_msg ? "#{helpers.time_ago_in_words(last_msg.created_at)} ago" : ""
  end

  # For now, unreadCount is a placeholder. Implementing this requires a more complex schema.
  attribute :unreadCount do |conversation|
    0 # Placeholder
  end

  # For now, isOnline is a placeholder. Implementing this requires a real-time system.
  attribute :isOnline do |conversation|
    [ true, false ].sample # Placeholder
  end

  # Get the role of the other participant.
  attribute :role do |conversation, params|
    other_participant = conversation.participants.find { |p| p.id != params[:current_user].id }
    other_participant.role if other_participant
  end

  # Helper to access ActionView helpers like time_ago_in_words
  def self.helpers
    ActionController::Base.helpers
  end
end
