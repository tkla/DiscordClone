# == Schema Information
#
# Table name: channels
#
#  id            :bigint           not null, primary key
#  server_id     :integer          not null
#  name          :string           not null
#  author_id     :integer          not null
#  voice_channel :boolean          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Channel < ApplicationRecord
   validates :server_id, :author_id, :name, presence: true 
   validates :name, uniqueness: {scope: :server_id, case_sensitive: false,
      message: "already exists on this server"
   } 
   validates :voice_channel, inclusion: [true, false]
   after_save :welcome_post 

   belongs_to :server

   belongs_to :author, 
      class_name: :User 

   has_many :posts,
      dependent: :destroy

   private 
   def welcome_post 
      global_admin = Rails.cache.fetch :global_admin, :expires_in => 7.days do
         User.find_by(username: 'Admin')
      end

      Post.create(server_id: self.server_id, channel_id: self.id, author_id: global_admin.id, 
      body: "Welcome to #{self.name} chat!")
   end
end
