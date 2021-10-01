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

   belongs_to :author,
      class_name: :User

   has_many :user_servers

   has_many :users, 
      through: :user_servers

   has_many :channels

   def admins 
      self.users.where('admin = true');
   end

end