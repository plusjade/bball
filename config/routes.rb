Bball::Application.routes.draw do
  root :to => "home#index"
  match "account" => "home#account"
  match "game"    => "home#game"
  resources :teams do
    resources :players
  end
end
