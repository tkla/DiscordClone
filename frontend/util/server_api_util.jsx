// UsersController
export const userServers = () => (
   $.ajax({
      url: '/api/users/current_user_servers',
      method: 'GET'
   })
)

export const usersIndex = (serverId) => (
   $.ajax({
      url: `/api/servers/${serverId}/users`,
      method: 'GET'
   })
)

export const userShow = (id) => (
   $.ajax({
      url: `/api/users/${id}`,
      method: 'GET'
   })
)

export const userEdit = (userId, formUser) => (
   $.ajax({
      url: `/api/users/${userId}`,
      method: "PATCH",
      data: formUser,
      contentType: false,
      processData: false
   })
)

// ServersController 
export const serversIndex = () => (
   $.ajax({
      url: `/api/servers`,
      method: 'GET'
   })
)

export const serverCreate = (formServer) => (
   $.ajax({
      url: '/api/servers',
      method: 'POST',
      data: formServer,
      contentType: false,
      processData: false
   })
)

export const serverShow = (id) => (
   $.ajax({
      url: `/api/servers/${id}`,
      method: 'GET'
   })
)

export const serverEdit = (id, formServer) => (
   $.ajax({
      url: `/api/servers/${id}`,
      method: "PATCH",
      data: formServer,
      contentType: false,
      processData: false
   })
)

export const serverDestroy = (id) => (
   $.ajax({
      url: `/api/servers/${id}`,
      method: 'DELETE'
   })
)

export const serverJoin = (id) => (
   $.ajax({
      url: `/api/servers/${id}`,
      method: 'POST'
   })
)

export const serverLeave = (id) => (
   $.ajax({
      url: `/api/servers/${id}/leave`,
      method: 'DELETE'
   })
)

// ChannelsController
export const channelsIndex = (serverId) => (
   $.ajax({
      url: `/api/servers/${serverId}/channels`,
      method: 'GET'
   })
)

export const channelShow = (id) => (
   $.ajax({
      url: `/api/channels/${id}`,
      method: 'GET'
   })
)

export const channelCreate = (formChannel) => (
   $.ajax({
      url: `/api/channels`,
      method: 'POST',
      data: {channel: formChannel}
   })
)

export const channelDestroy = (id) => (
   $.ajax({
      url: `/api/channels/${id}`,
      method: 'DELETE'
   })
)

// PostsController
export const postsIndex = (channelId) => (
   $.ajax({
      url: `/api/channels/${channelId}/posts`,
      method: 'GET'
   })
)

export const postShow = (id) => (
   $.ajax({
      url: `/api/posts/${id}`,
      method: 'GET'
   })
)

export const postCreate = (formPost) => (
   $.ajax({
      url: `/api/posts`,
      method: 'POST',
      data: {post: formPost}
   })
)

export const postEdit = (id, formPost) => (
   $.ajax({
      url: `/api/posts/${id}`,
      method: 'PATCH',
      data: {post: formPost}
   })
)

export const postDestroy = (id) => (
   $.ajax({
      url: `/api/posts/${id}`,
      method: 'DELETE'
   })
)


