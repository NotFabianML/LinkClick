class MakeMessagesPolymorphic < ActiveRecord::Migration[8.0]
  def change
    # Remove the old foreign key that linked messages only to sessions.
    remove_reference :messages, :session, foreign_key: true, index: true

    # Add the new polymorphic columns.
    add_reference :messages, :messageable, polymorphic: true, index: true, null: false
  end
end
