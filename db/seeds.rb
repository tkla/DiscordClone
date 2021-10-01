# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Users
User.create(username: 'demo', email: 'demodemo@test.com', password:'123456')
User.create(username: 'TheSecond', email: 'theSecond@test.com', password: '123456')
User.create(username: 'Third', email: 'third3@test.com', password: '123456')

#Servers
Server.create(name: 'League', author_id: '1')
Server.create(name: 'Hololive', author_id: '1')
Server.create(name: 'Work', author_id: '2')
Server.create(name: 'Empty', author_id: '2')

#User's Servers (A joins table representing the servers a they are a member of)
UserServer.create(user_id: 1, server_id: 1, admin: true)
UserServer.create(user_id: 1, server_id: 2, admin: true)
UserServer.create(user_id: 1, server_id: 3, admin: false)

UserServer.create(user_id: 2, server_id: 1, admin: false)
UserServer.create(user_id: 2, server_id: 3, admin: false)

UserServer.create(user_id: 3, server_id: 1, admin: false)
UserServer.create(user_id: 3, server_id: 2, admin: false)

