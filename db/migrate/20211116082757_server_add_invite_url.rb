class ServerAddInviteUrl < ActiveRecord::Migration[5.2]
   def change
      add_column :servers, :invite_url, :string 
      
      add_index :servers, :invite_url, unique: true
   end
end
