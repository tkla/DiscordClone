@channels.each do |c|
   json.set! c.id do 
      json.partial! 'api/channels/channel', channel: c

      json.comments c.posts.map{ |c| c.id }
   end 
end