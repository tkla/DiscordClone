@users.each do |u|
   json.set! u.id do 
      json.partial! 'api/users/user', user: u 
   end 
end

# Remove later.
json.set! current_user.id do 
   json.partial! 'api/users/user', user: current_user
end
