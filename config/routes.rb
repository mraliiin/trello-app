Rails.application.routes.draw do
    devise_for :users

    root 'application#index'

    # boards
    get 'api/boards' => 'boards#index'
    post 'api/boards' => 'boards#create'
    get 'api/boards/:id' => 'boards#show'
    delete 'api/boards/:id' => 'boards#destroy'

    # lists
    get 'api/boards/:id/lists' => 'lists#index'
    post 'api/boards/:id/lists' => 'lists#create'
    get 'api/boards/:id/lists/:list_id' => 'lists#show'
    delete 'api/lists/:list_id' => 'lists#destroy'
    post 'api/boards/:board_id/lists/:list_id/position' => 'lists#save_position'

    # cards
    get 'api/lists/:id/cards' => 'cards#index'
    post 'api/lists/:id/cards' => 'cards#create'
    get 'api/lists/:id/cards/:card_id' => 'cards#show'
    delete 'api/cards/:card_id' => 'cards#destroy'
    post 'api/lists/:list_id/cards/:card_id/position' => 'cards#save_position'

    get '/:path/(:view)' => 'application#index'
end
