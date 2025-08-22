class CreateJoinRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :join_requests do |t|
      t.references :user, null: false, foreign_key: true
      t.references :session, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
