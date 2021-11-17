# == Schema Information
#
# Table name: posts
#
#  id            :bigint           not null, primary key
#  server_id     :integer          not null
#  channel_id    :integer          not null
#  author_id     :integer          not null
#  parent_id     :integer
#  body          :text             not null
#  original_body :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Post < ApplicationRecord
   validates :server_id, :channel_id, :author_id, presence: true 
   validate :check_same_channel
   validate :check_belong_server # Check if user belongs to server
   after_initialize :ensure_original_body

   belongs_to :channel 
   
   belongs_to :server 

   belongs_to :user,
      foreign_key: :author_id

   has_many :replies, 
      foreign_key: :parent_id,
      class_name: :Post 
   

   #Only reply to posts in the same channel.
   def check_same_channel
      return true if !self.parent_id 

      parent = Post.find_by_id(self.parent_id) 
      if !parent || parent.channel_id != self.channel_id
         errors.add("#{self.parent_id}", ": Unable to find parent post.") 
         return false 
      end
      
      true 
   end
   
   private
   def ensure_original_body
      self.original_body = self.body;
   end

   def check_belong_server 
      user = User.find_by_id(self.author_id)
      
      return false if !user 
      if !user.is_member?(self.server_id) 
         errors.add(:user, "You are not a member of this server.")
      end
   end
end
