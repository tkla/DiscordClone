class Api::SessionsController < ApplicationController
   def create
      # Find user by credentials
      username = ''  
      if params[:user][:email] 
         username = User.find_by(email: params[:user][:email])
         if !username 
            return render json: ['Incorrect password or email/phone number.'], status: 401
         end
         username = username.username 
      else 
         username = params[:user][:username]
      end
      
      @user = User.find_by_credentials(username, params[:user][:password])
      if @user.nil?
         render json: ['Incorrect password or email/phone number.'], status: 401
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