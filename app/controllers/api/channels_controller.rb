class Api::ChannelsController < ApplicationController

   def index 
      server = Server.find_by_id(params[:server_id])
      
      if server 
         @channels = server.channels.includes(:posts)
         render :index
      else
         render json: server.errors.full_messages, status: 404
      end
   end
end
