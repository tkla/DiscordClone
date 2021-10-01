@servers.each do |s|
   json.set! s.id do 
      json.partial! 'api/servers/server', server: s

      json.allUsers s.users.map{ |u| u.id }
      json.allChannels s.channels.map{ |c| c.id }
   end 
end