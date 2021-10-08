# Discord Clone 
For those not familiar with Discord, it is a web application that allows users to create Servers in which other users can then join. Servers within them have channels dedicated to many user customized categories. 

A major feature are voice channels which users can enter and participate in conversations with other current participants. 

Discord clone is a small project aimed at replicating some of the base functionality of Discord. This is a projectly mainly meant as a learning tool for myself in building full stack web applications. 

It aims to reproduce some of the expected behaviours and features from Discord such as server creation, registration of users, joining communities and making posts within.



## Servers 
Users can currently browse through their current channels. By selecting their channel icon on the left side bar they can view a server's channels and member list. 
The server icons are styled with CSS transitions to give a impression of responsiveness when hovered over and clicked on. 

Users can create new servers by selecting the "+" button at the bottom of the server bar.

You can invite others to join your server by giving them the direct url to your server. If they are logged in a prompt will be given to them to request if they would like to join.

## Channels
Channels are the main hub of Discord Clone. Users once logged in can make posts in selected channels. 

Clicking on a channel will load the channel's posts and enable an input window for you to submit posts.

## User Authentication
Account registration and user logins are fully implemented. Users can make new accounts and use those credentials to log in. Users will have their list of servers persisted and will not be lost on refresh or redirects. 

Account information will be saved on DB on Heroku, only salted and hashed passwords are stored on our DB.

## Basic User Guide of Currently Implemented Features



## Planned Features
Implement avatars and hosted images via Active Storage and hosted on AWS S3. A core identity of Discord is showing off your user flair in your communities. It would be a shame if all users were represented as default blanks.

In addition Live chat is highest priority and will probably the next upcoming feature. Will be using rails Action Cable to integrate web sockets with my post components.

    
