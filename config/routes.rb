Bball::Application.routes.draw do
  root :to => "home#index"
  match "dash" => "dash#index"
  resources :teams do
    resources :players
  end
end
