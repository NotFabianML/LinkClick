class Api::V1::ConnectionsController < ApplicationController
  before_action :authenticate_user!

  # GET /api/v1/connections
  # Returns a list of the current user's accepted connections (friends).
  def index
    users = User.where.not(id: current_user.id)
                .where.not(role: User::ROLES[:admin])
    render json: Api::V1::SelectableUserSerializer.new(users).serializable_hash
  end
end
