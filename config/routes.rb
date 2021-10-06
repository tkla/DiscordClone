Rails.application.routes.draw do
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   root :to => "static_pages#root"
   mount ActionCable.server, at: '/cable'

   namespace :api, defaults: {format: :json} do 
      
      resources :users, only: [:create, :show] do 
         collection do 
            get 'current_user_servers', to: 'users#get_servers'
         end
      end
      
      delete '/servers/:server_id/leave', to: 'servers#leave_server'
      resources :servers, only: [:index, :create, :show, :destroy] do 
         collection do 
            post ':id', to: 'servers#join_server'
         end
         resources :channels, only: [:index]
         resources :users, only: [:index]
      end
      
      resources :channels, only: [:create, :show, :destroy] do
         resources :posts, only: [:index]
      end

      resources :posts, only: [:create, :show, :destroy]

      resource :session, only: [:create, :destroy]
   end
   
end
