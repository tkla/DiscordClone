export const userServers = () => (
   $.ajax({
      url: '/api/users/current_user_servers',
      method: 'GET'
   })
)