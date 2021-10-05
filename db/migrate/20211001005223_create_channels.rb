class CreateChannels < ActiveRecord::Migration[5.2]
   def change
      create_table :channels do |t|
         t.integer :server_id, null: false 
         t.string :name, null: false 
         t.integer :author_id, null: false 
         t.boolean :voice_channel, null: false 

         t.timestamps 
      end

      add_index :channels, [:server_id, :name], unique: true 
   end
end
