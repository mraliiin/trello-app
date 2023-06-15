class CreateLists < ActiveRecord::Migration
    def change
        create_table :lists do |t|
            t.string :name, null: false
            t.integer :position, default: 0
            t.integer :user_id, null: false
            t.integer :board_id, null: false

            t.timestamps null: false
        end
    end
end
