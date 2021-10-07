@users.each do |u|
   json.set! u.id do 
      json.partial! 'api/users/user', user: u 
   end 
end
