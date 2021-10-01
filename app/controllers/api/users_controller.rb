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
   
   #Do later, for now just show first user
   def index 
      @user = User.find_by(id: 1)
      render :show
   end

   def show 
      @user = User.find_by(id: params[:id])
      if @user 
         render :show 
      else 
         render json: @user.errors.full_messages, status: 404
      end
   end

   def get_servers 
      @user = current_user 

      if @user 
         @servers = @user.servers
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
