Rails.application.routes.draw do
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   root :to => "static_pages#root"
   
   namespace :api, defaults: {format: :json} do 
      
      resources :users, only: [:index, :create, :show] do 
         collection do 
            get 'current_user_servers', to: 'users#get_servers'
         end
         #resources :servers, only: [:index]
      end
      
      #resources :servers, only: [:index, :create, :show, :destroy] 
      resource :session, only: [:create, :destroy]
   end
   
end
