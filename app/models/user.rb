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
   validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP,
      message: 'invalid format'} 
   validates :username, length: {minimum: 2, maximum: 32}, uniqueness: { case_sensitive: false }
   validates :password_digest, presence: true
   validates :password, length: {minimum: 6}, allow_nil: true
   validate :max_file_size
   after_initialize :ensure_session_token 

   attr_reader :password

   has_many :servers_created,
      class_name: :Server,
      foreign_key: :author_id 

   has_many :user_servers,
      dependent: :destroy

   has_many :servers, 
      through: :user_servers 

   has_many :channels,
      foreign_key: :author_id

   has_many :posts,
      foreign_key: :author_id  
   
   has_one_attached :avatar

   #Get this user's list of servers and their server's list of channels and members.
   def includes_server_users
      servers = self.servers.includes(:users, :channels)
   end

   #Check if user is admin of server
   def is_admin?(server_id) 
      !self.user_servers.where('server_id = ? AND admin = TRUE', server_id).empty?
   end

   def is_member?(server_id)
      !self.user_servers.where('server_id = ?', server_id).empty?
   end

   #User Auth
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

   private 
   def max_file_size
      if self.avatar.byte_size > 10000000 
         errors.add(:Image, "10 MB file size limit exceeded.")
         return false 
      else 
         return true
      end
   end
end
