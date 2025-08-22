class CreateAchievements < ActiveRecord::Migration[8.0]
  def change
    create_table :achievements do |t|
      t.string :name
      t.string :description
      t.string :icon
      t.integer :rarity

      t.timestamps
    end
  end
end
