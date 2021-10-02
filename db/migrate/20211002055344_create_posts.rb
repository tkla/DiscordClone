class CreatePosts < ActiveRecord::Migration[5.2]
   def change
      create_table :posts do |t|
         t.integer :server_id, null: false 
         t.integer :channel_id, null: false 
         t.integer :author_id, null: false 
         t.integer :parent_id
         t.text :body, null: false 
         t.text :original_body 

         t.timestamps
      end

      add_index :posts, :server_id 
      add_index :posts, :channel_id 
      add_index :posts, :author_id 
   end
end
