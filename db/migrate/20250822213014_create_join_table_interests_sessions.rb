class CreateJoinTableInterestsSessions < ActiveRecord::Migration[8.0]
  def change
    create_join_table :interests, :sessions do |t|
      t.index [ :interest_id, :session_id ]
      t.index [ :session_id, :interest_id ]
    end
  end
end
