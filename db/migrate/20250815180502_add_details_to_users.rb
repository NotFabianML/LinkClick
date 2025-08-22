class AddDetailsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :bio, :text
    add_column :users, :linkedin_url, :string
    add_column :users, :github_url, :string
    add_column :users, :role, :integer, default: 0, null: false

    add_column :users, :phone, :string
    add_column :users, :country, :string
    add_column :users, :website, :string
    add_column :users, :university, :string

    add_column :users, :profile_visibility, :integer, default: 0, null: false
    add_column :users, :show_email, :boolean, default: false, null: false
    add_column :users, :show_phone, :boolean, default: false, null: false
    add_column :users, :show_activity, :boolean, default: true, null: false
    add_column :users, :allow_messages, :boolean, default: true, null: false

    add_column :users, :email_notifications, :boolean, default: true, null: false
    add_column :users, :session_reminders, :boolean, default: true, null: false
    add_column :users, :connection_requests, :boolean, default: true, null: false
    add_column :users, :marketing_emails, :boolean, default: false, null: false
  end
end
