@channels.each do |c|
   json.set! c.id do 
      json.partial! 'api/channels/channel', channel: c

      json.posts c.posts.map{ |post| post.id }
   end 
end