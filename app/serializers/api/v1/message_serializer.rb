class Api::V1::MessageSerializer
  include JSONAPI::Serializer

  set_type :message

  # Define the attributes based on the ChatMessage TypeScript type.
  attributes :id, :content

  # Custom attribute for a human-readable timestamp.
  attribute :timestamp do |message|
    message.created_at.strftime("%I:%M %p")
  end

  # Get the sender's full name.
  attribute :senderName do |message|
    "#{message.sender.first_name} #{message.sender.last_name}" if message.sender
  end

  # Get the sender's initials.
  attribute :senderInitials do |message|
    "#{message.sender.first_name&.first}#{message.sender.last_name&.first}" if message.sender
  end

  # Ensure we send the sender's ID so the frontend can determine the message alignment.
  attribute :senderId do |message|
    message.sender_id
  end
end
