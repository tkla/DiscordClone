json.extract! user, :username, :email, :id, :nickname
json.avatar url_for(user.avatar) if user.avatar.attached?
json.allServers user.servers.map{ |server| server.id}