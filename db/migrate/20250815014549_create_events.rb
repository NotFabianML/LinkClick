class CreateEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :events do |t|
      t.references :session, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.string :google_calendar_event_id

      t.timestamps
    end
  end
end
