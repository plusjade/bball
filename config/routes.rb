Bball::Application.routes.draw do
  root :to => "home#index"
  match "account" => "home#account"
  resources :teams do
    resources :players
  end
end
