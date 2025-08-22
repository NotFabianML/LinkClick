require "csv"

class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!
  before_action :set_user, only: [ :update, :destroy, :toggle_status ]

  def index
    respond_to do |format|
      format.json do
        render json: User.all.map { |user| format_user_for_admin(user) }
      end
    end
  end

  def update
    if @user.update(user_params)
      redirect_to admin_dashboard_path, notice: "User was successfully updated."
    else
      render :edit
    end
  end

  def destroy
    if @user.discard
      render json: { message: "User successfully deactivated." }, status: :ok
    else
      render json: { error: "Failed to deactivate user." }, status: :unprocessable_entity
    end
  end

  def toggle_status
    if @user.discarded?
      @user.undiscard
    else
      @user.discard
    end
    render json: Admin::DashboardController.new.send(:format_users_for_admin, [ @user ]).first, status: :ok
  end

  def export
    @users = User.all.order(created_at: :desc)

    csv_data = CSV.generate(headers: true) do |csv|
      csv << [ "ID", "First Name", "Last Name", "Email", "Role", "Join Date", "Status" ]

      @users.each do |user|
        csv << [
          user.id,
          user.first_name,
          user.last_name,
          user.email,
          user.role,
          user.created_at.strftime("%Y-%m-%d"),
          user.status
        ]
      end
    end

    send_data csv_data, filename: "users-export-#{Date.today}.csv", type: "text/csv; charset=utf-8"
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :role) # Define los campos editables
  end

  def authorize_admin!
    redirect_to root_path, alert: "Not authorized." unless current_user.admin?
  end
end
