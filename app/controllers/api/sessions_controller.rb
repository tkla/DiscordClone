
class Api::SessionsController < ApplicationController
   def create
      # Find user by credentials
      username = ''  
      # If logging in by email
      if params[:user][:email] 
         username = User.find_by(email: params[:user][:email])
         if !username 
            return render json: ['Login or password is invalid.'], status: 401
         end
         username = username.username 
      else 
         username = params[:user][:username]
      end
      
      # Disable admin login. 
      if username == 'Admin'
         return render json: ['You do not have access to Admin account'], status: 401
      end
      
      # Get username from emails then use as credentials
      @user = User.find_by_credentials(username, params[:user][:password])
      if @user.nil?
         render json: ['Login or password is invalid.'], status: 401
      else
         login(@user)
         render 'api/users/show'
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