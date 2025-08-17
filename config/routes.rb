Rails.application.routes.draw do
  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    devise_for :users
    resources :posts
    root "home#index"
    get "/dashboard", to: "dashboard#index"
    get "/browse", to: "browse#index"

    resources :users, only: [ :index, :show ]
    resource :profile, only: [ :show, :edit, :update ]
    resources :sessions, only: [ :index, :new, :create, :show ]
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
