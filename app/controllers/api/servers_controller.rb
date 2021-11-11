class Api::ServersController < ApplicationController
   def index 
      @servers = Server.all.includes(:users, :channels) 

      render :index 
   end
   
   def create 
      @server = Server.new(server_params)

      if @server.save  
         UserServer.create(server_id: @server.id, user_id: current_user.id, admin: true)
         render :show 
      else 
         render json: @server.errors.full_messages, status: 401 
      end 
   end

   def update 
      @server = Server.find_by_id(params[:id])
      if !@server 
         render json: "Unable to find server", status: 404
         return 
      end 

      if @server.update(server_params)
         render :show
      else 
         render json: @server.errors.full_messages, status: 401
      end
   end

   def join_server
      @server = Server.find_by_id(params[:id]);
      if !@server 
         return render json: 'Unable to locate server.', status: 404 
      end

      joined = UserServer.new(server_id: @server.id, user_id: current_user.id, admin: false)
      if joined.save
         render :show 
      else 
         render json: 'Unable to join server.', status: 401
      end

   end

   def leave_server
      @server = Server.find_by_id(params[:server_id]);
      if !@server 
         return render json: 'Unable to locate server.', status: 404 
      end

      leave = UserServer.find_by(server_id: @server.id, user_id: current_user.id)
      if leave
         leave.destroy
         render :show 
      else 
         render json: 'Error leaving server.', status: 404
      end

   end

   def show 
      @server = Server.find_by_id(params[:id])

      if @server 
         render :show 
      else 
         render json: "Unable to locate server.", status: 404 
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
      params.require(:server).permit(:name, :author_id, :avatar, :description)
   end
end
