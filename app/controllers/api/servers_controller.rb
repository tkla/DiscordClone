class Api::ServersController < ApplicationController
   def index 
      @servers = Server.all 

      render :index 
   end
   
   def show 
      @server = Server.find_by_id(params[:id])

      if @server 
         render :show 
      else 
         render json: @server.errors.full_messages, status: 404 
      end 
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

   def destroy
      @check_if_owner = Server.find_by(id: params[:id], author_id: current_user.id )
      @server = @check_if_owner
      if @check_if_owner
         @check_if_owner.destroy 
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
