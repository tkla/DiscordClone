@channels.each do |c|
   json.set! c.id do 
      json.partial! 'api/channels/channel', channel: c
   end 
end