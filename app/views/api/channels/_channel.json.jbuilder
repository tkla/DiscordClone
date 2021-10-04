json.extract! channel, :id, :server_id, :name, :author_id, :voice_channel
json.posts channel.posts.map{ |post| post.id }