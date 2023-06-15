class CreateCards < ActiveRecord::Migration
    def change
        create_table :cards do |t|
            t.string :title, null: false
            t.integer :position, default: 0
            t.integer :list_id, null: false

            t.timestamps null: false
        end
    end
end
