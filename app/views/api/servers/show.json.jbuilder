json.partial! 'api/servers/server', server: @server

json.currentUser do 
   json.partial! 'api/users/user', user: current_user
end
