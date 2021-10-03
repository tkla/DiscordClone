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
   validates :name, uniqueness: {scope: :server_id,
      message: "There is already a channel with that name."
   } 
   validates :voice_channel, inclusion: [true, false]

   belongs_to :server

   belongs_to :author, 
      class_name: :User 

   has_many :posts,
      dependent: :destroy
end
