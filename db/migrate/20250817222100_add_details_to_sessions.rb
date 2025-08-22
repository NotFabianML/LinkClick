class AddDetailsToSessions < ActiveRecord::Migration[8.0]
  def change
    add_column :sessions, :difficulty, :integer, default: 0
    add_column :sessions, :max_participants, :integer, default: 10
    add_column :sessions, :start_date, :date
    add_column :sessions, :start_time, :time
    add_column :sessions, :duration, :float

    add_column :sessions, :is_public, :boolean, default: true, null: false
    add_column :sessions, :allow_recording, :boolean, default: false, null: false
    add_column :sessions, :requires_approval, :boolean, default: false, null: false
  end
end
