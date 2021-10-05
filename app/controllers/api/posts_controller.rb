class Api::PostsController < ApplicationController

   def show 
      @post = Post.find_by_id(params[:id])

      if @post 
         render :show 
      else 
         render json: "No post found.", status: 404 
      end 
   end 

   def index 
      @posts = Post.all.where('channel_id = ?', params[:channel_id])
      
      if !@posts.empty? 
         render :index 
      else 
         render json: "Could not locate either posts or channel.", status: 404 
      end 
   end 

   def create
      if !current_user.is_member?(post_params[:server_id])
         return render json: "Only members of this server may create posts.", status: 401 
      end  

      @post = Post.new(post_params)
      
      if @post.save 
         render :show 
      else 
         render json: @post.errors.full_messages, status: 404
      end 
   end 

   def destroy 
      @post = Post.find_by_id(params[:id])
      if !@post 
         render json: "Unable to find post.", status: 404 
      else 
         if current_user.is_admin?(@post.server_id) || current_user.id == @post.author_id
            @post.destroy
            render :show 
         else 
            render json: "You do not have permission to delete this post.", status: 401 
         end
      end
   end

   private 
   def post_params 
      params.require(:post).permit(:server_id, :channel_id, :author_id, :body, :original_body, :parent_id)
   end
end
