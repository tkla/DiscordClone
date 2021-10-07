json.byId do 
   @posts.each do |post|
      json.set! post.id do  
         json.partial! 'api/posts/post', post: post 
      end
   end
end

json.currentChannelId @posts.first.channel_id

