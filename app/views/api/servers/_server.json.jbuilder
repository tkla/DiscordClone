json.extract! server, :id, :name, :author_id
json.allUsers server.users.map{ |u| u.id }
json.allChannels server.channels.map{ |c| c.id }