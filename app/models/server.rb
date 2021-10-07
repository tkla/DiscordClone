# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
   validates :name, presence: true, uniqueness: true 
   validates :author_id, presence: true  
   after_save :add_global_admin, :add_default_channel

   belongs_to :author,
      class_name: :User

   has_many :user_servers,
      dependent: :destroy

   has_many :users, 
      through: :user_servers

   has_many :channels,
      dependent: :destroy

   has_many :posts 

   def admins 
      self.users.where('admin = true');
   end

   private 
   def add_global_admin 
      UserServer.create(user_id: global_admin.id, server_id: self.id, admin: true)
   end

   def add_default_channel 
      Channel.create(server_id: self.id, name: 'General', author_id: global_admin.id, voice_channel: false)
   end

   def global_admin 
      Rails.cache.fetch :global_admin, :expires_in => 7.days do
         User.find_by(username: 'Admin')
      end
   end
end
