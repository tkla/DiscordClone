# == Schema Information
#
# Table name: user_servers
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  server_id  :integer          not null
#  admin      :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserServer < ApplicationRecord
   validates :user_id, uniqueness: {scope: :server_id,
      message: "User is already a member of that server."
   }

   validates :admin, inclusion: [true, false]

   belongs_to :server 

   belongs_to :user   
end
