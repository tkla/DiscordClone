# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  nickname        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
   validates :username, :email, presence: true, uniqueness: true 
   validates :password_digest, presence: true
   validates :password, length: {minimum: 6}, allow_nil: true
   after_initialize :ensure_session_token 

   attr_reader :password

   has_many :servers_created,
      class_name: :Server,
      foreign_key: :author_id 

   has_many :user_servers

   has_many :servers, 
      through: :user_servers 

   has_many :channels,
      foreign_key: :author_id

   def self.find_by_credentials(username, password) 
      user = User.find_by(username: username) 
      if user && user.is_password?(password) 
         user 
      else 
         nil 
      end
   end

   def password=(password)
      self.password_digest = BCrypt::Password.create(password)
      @password = password 
   end 

   def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
   end

   def reset_session_token!  
      self.session_token = SecureRandom::urlsafe_base64 
      self.save!
      self.session_token
   end

   def ensure_session_token  
      self.session_token ||= SecureRandom::urlsafe_base64
   end
end
