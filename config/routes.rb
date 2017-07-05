Rails.application.routes.draw do
  root 'pages#index'

  namespace :bus5 do
    get '(*foo)' => 'pages#index'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
