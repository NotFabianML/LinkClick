class AddIndexesToJoinTables < ActiveRecord::Migration[8.0]
  def change
    # Index for the interests_users join table to speed up user-interest lookups.
    add_index :interests_users, [ :user_id, :interest_id ], name: 'index_interests_users_on_user_and_interest'
    add_index :interests_users, [ :interest_id, :user_id ], name: 'index_interests_users_on_interest_and_user' # reverse lookups

    # Index for the badges_users join table to speed up user-badge lookups.
    add_index :badges_users, [ :user_id, :badge_id ], name: 'index_badges_users_on_user_and_badge'
    add_index :badges_users, [ :badge_id, :user_id ], name: 'index_badges_users_on_badge_and_user' # Optional

    # Index for the sessions_users (participants) join table
    add_index :sessions_users, [ :session_id, :user_id ], name: 'index_sessions_users_on_session_and_user'
    add_index :sessions_users, [ :user_id, :session_id ], name: 'index_sessions_users_on_user_and_session' # for reverse lookups
  end
end
