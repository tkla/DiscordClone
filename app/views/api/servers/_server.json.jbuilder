json.extract! server, :id, :name, :author_id, :description
json.avatar url_for(server.avatar) if server.avatar.attached?
json.allUsers server.users.map{ |u| u.id }
json.allChannels server.channels.map{ |c| c.id }