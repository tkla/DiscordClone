json.extract! user, :username, :email, :id, :nickname
json.allServers user.servers.map{ |server| server.id}