@servers.each do |s|
   json.set! s.id do 
      json.partial! 'api/servers/server', server: s
   end 
end

# json.currentUser do 
#    json.partial! 'api/users/user', user: current_user
# end