class AddDescriptionsToServers < ActiveRecord::Migration[5.2]
  def change
      add_column :servers, :description, :text 
  end
end
