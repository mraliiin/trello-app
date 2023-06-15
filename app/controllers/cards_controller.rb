class CardsController < ApplicationController
    before_filter :authenticate_user!

    def index
        list = List.includes(:cards).where(:id => params[:id]).first
        render :json => list.cards
    end

    def show
        render :json => Card.find_by(id: params[:id])
    end

    def create
        card = Card.new(card_params)
        if card.save
            render :json => card
        else
            render_response :error => card.errors.full_messages
        end
    end

    def update
        card = Card.find_by(id: params[:id])
        if card.update(card_params)
            render_response card
        else
            render_response :error => card.errors.full_messages
        end
    end

    def destroy
        card = Card.find_by(id: params[:card_id])
        card.destroy if card.present?
    end

    def save_position
        args = card_params
        card = Card.find_by(id: args[:card_id])

        # Move to new list
        if (card[:list_id] != args[:list_id])
            card[:list_id] = args[:list_id]
            card.save
        end

        update_position(args)
    end

    def update_position(args)
        args = card_params
        selectedCard = Card.find_by(id: params[:card_id])
        return if selectedCard.blank? || selectedCard[:position] == args[:position]

        list_cards = Card.where('cards.id != ? AND cards.list_id = ?', args[:card_id], args[:list_id]).to_a

        list_cards.insert(args[:position], selectedCard)
        list_cards.each_with_index do |card, index|
            card[:position] = index
            card.save
        end

        render :json => list_cards
    end

    private

    def card_params
        params.require(:card).permit(:title, :list_id, :card_id, :id, :position)
    end
end
