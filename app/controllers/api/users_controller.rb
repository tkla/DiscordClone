class Api::UsersController < ApplicationController
   def create
      @user = User.new(user_params)
      
      if @user.save 
         login(@user)
         render :show 
      else 
         render json: @user.errors.full_messages, status: 401
      end
   end 
   
   #Return all users in server_id
   def index 
      server = Server.find_by_id(params[:server_id])
      

      if server
         @users = server.users
         render :index 
      else 
         render json: "Unable to find server.", status: 404 
      end
   end

   def show 
      @user = User.find_by(id: params[:id])
      if @user 
         render :show 
      else 
         render json: "User does not exist.", status: 404
      end
   end

   def get_servers 
      @user = current_user 

      if @user 
         @servers = @user.includes_server_users
         render 'api/servers/index'
      else 
         render json: @user.errors.full_messages, status: 404
      end
   end

   private 
   def user_params
      params.require(:user).permit(:username, :password, :email)
   end
end
