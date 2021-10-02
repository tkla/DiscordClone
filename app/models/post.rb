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

   belongs_to :channel 
end
