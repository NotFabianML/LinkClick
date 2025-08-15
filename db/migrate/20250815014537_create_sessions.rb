class CreateSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :sessions do |t|
      t.string :title
      t.text :description
      t.integer :session_type
      t.integer :status
      t.references :creator, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
