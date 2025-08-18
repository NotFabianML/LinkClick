Rails.application.routes.draw do
  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    devise_for :users
    root "home#index"
    get "/dashboard", to: "dashboard#index"
    get "/browse", to: "browse#index"

    resources :users, only: [ :index, :show ]
    resource :profile, only: [ :show, :edit, :update, :destroy ]
    resources :sessions, only: [ :index, :new, :create, :show ] do
      member do
        post :join
        patch :notepad
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
