class Api::ChannelsController < ApplicationController

   def index 
      @channels = Server.find_by_id(params[:server_id]).channels.includes(:posts)
      
      if @channels 
         render :index
      else
         render json: "Server does not exist", status: 404
      end
   end

   def show 
      @channel = Channel.find_by_id(params[:id])

      if @channel 
         render :show
      else 
         render json: "Channel does not exist", status: 404 
      end 
   end 

   def create 
      @channel = Channel.new(channel_params)
      
      # is_admin = 
      #    current_user.user_servers.
      #    where('server_id = ? AND admin = TRUE', params[:channel][:server_id] )

      if !current_user.is_admin?(params[:channel][:server_id])
         return render json: "Only a server admin may perform this action.", status: 401
      end

      if @channel.save
         render :show
      else 
         render json: @channel.errors.full_messages, status: 401
      end
   end 

   def destroy 
      @channel = Channel.find_by_id(params[:id])
    
      if @channel
         if !current_user.is_admin?(@channel.server_id)
            return render json: "Only a server admin may perform this action.", status: 401
         else 
            @channel.destroy
            render :show  
         end
      else 
         render json: "Channel not found", status: 404
      end 
   end

   private 
   def channel_params 
      params.require(:channel).permit(:server_id, :name, :author_id, :voice_channel)
   end
end
