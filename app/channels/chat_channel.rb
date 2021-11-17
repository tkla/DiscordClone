class ChatChannel < ApplicationCable::Channel
   def subscribed
      # stream_from "some_channel"
      stream_for 'chat_channel'
   end

   # Implement error checking and validations later.
   def speak(data)
      post = Post.create(data.slice('server_id', 'channel_id', 'parent_id', 'body', 'author_id'))
      return if !post.valid? 
      socket = {
         id: post.id, 
         channel_id: post.channel_id,
         author_id: post.author_id,
         parent_id: post.parent_id,
         body: post.body,
         created_at: post.created_at,
         server_id: post.server_id, 
         username: post.user.username,
      }
      ChatChannel.broadcast_to('chat_channel', socket)
   end

   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end
