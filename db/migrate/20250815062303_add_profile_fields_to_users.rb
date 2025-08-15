class AddProfileFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :phone, :string
    add_column :users, :country, :string
    add_column :users, :website, :string
    add_column :users, :university, :string
    add_column :users, :profile_visibility, :integer
    add_column :users, :show_email, :boolean
    add_column :users, :show_phone, :boolean
    add_column :users, :show_activity, :boolean
    add_column :users, :allow_messages, :boolean
  end
end
