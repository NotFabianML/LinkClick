class CreateResources < ActiveRecord::Migration[8.0]
  def change
    create_table :resources do |t|
      t.references :session, null: false, foreign_key: true
      t.integer :resource_type
      t.text :content

      t.timestamps
    end
  end
end
