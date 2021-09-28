class Api::SessionsController < ApplicationController
   def create
      # Find user by credentials
      @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
      if @user.nil?
         render json: ['Incorrect password or username.'], status: 401
      else
         login(@user)
         render 'api/users/show';
      end
   end
 
   def destroy
      if logged_in?
         logout!
         render json: {}
      else 
         render json: ["Not Logged In"], status: 404
      end
   end
 
 end