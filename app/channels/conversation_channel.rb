class ConversationChannel < ApplicationCable::Channel
  def subscribed
    @conversation = Conversation.find_by(id: params[:conversation_id])

    if @conversation && @conversation.participants.include?(current_user)
      stream_for @conversation
    else
      reject
    end
  end

  def unsubscribed
    stop_all_streams
  end
end
