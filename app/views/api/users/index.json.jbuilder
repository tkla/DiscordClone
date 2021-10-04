@users.each do |u|
   json.set! u.id do 
      json.partial! 'api/users/user', user: u 

      json.allServers u.servers.map{ |server| server.id}
   end 
end