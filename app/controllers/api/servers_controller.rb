class Api::ServersController < ApplicationController
   def index 
      @servers = Server.all 

      render :index 
   end
   
   def create 
      @server = Server.new(server_params)

      if @server.save  
         UserServer.create(server_id: @server.id, user_id: current_user.id, admin: true)
         render :show 
      else 
         render json: @server.errors.full_messages, status: 402 
      end 
   end

   def show 
      @server = Server.find_by_id(params[:id])

      if @server 
         render :show 
      else 
         render json: "Server does not exist", status: 404 
      end 
   end

   def destroy
      @server  = Server.find_by(id: params[:id], author_id: current_user.id )
      
      if @server 
         @server.destroy 
         render :show 
      else 
         render json: "Only the owner of the server is permitted to perform this action", status: 401
      end
   end

   private 
   def server_params 
      params.require(:server).permit(:name, :author_id)
   end
end
