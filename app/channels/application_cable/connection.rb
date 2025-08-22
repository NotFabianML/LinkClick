# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # This identifies each connection by the user who is connected.
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      # This line uses the Warden middleware (which Devise uses)
      # to find the user from the session cookie sent with the connection request.
      if verified_user = env["warden"].user
        verified_user
      else
        # If no user is found, the connection is rejected.
        reject_unauthorized_connection
      end
    end
  end
end
