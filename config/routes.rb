Bball::Application.routes.draw do

  root :to => "home#index"
  match "app" => "dash#index"
  resources :games
  resources :teams do
    resources :players
  end
end
