class SessionChannel < ApplicationCable::Channel
  def subscribed
    # Find the session the user wants to subscribe to.
    @session = Session.find_by(id: params[:session_id])

    # Security: Ensure the session exists and the current user is a participant or creator.
    if @session && (@session.creator == current_user || @session.participants.include?(current_user))
      # Start streaming messages for this specific session.
      stream_for @session
    else
      reject
    end
  end

  def unsubscribed
    stop_all_streams
  end
end
