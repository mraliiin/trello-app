class ListsController < ApplicationController
    before_filter :authenticate_user!

    def index
        board = current_user.boards.includes(:lists).where(:id => params[:id]).first
        render json: board.to_json(include: {lists: {include: :cards} }), status: :ok
    end

    def show
        render :json => List.find_by(id: params[:id])
    end

    def create
        list = List.new(list_params)
        if list.save
            render :json => list
        else
            render_response :error => list.errors.full_messages
        end
    end

    def update
        list = List.find_by(id: params[:id])
        if list.update(list_params)
            render_response list
        else
            render_response :error => list.errors.full_messages
        end
    end

    def destroy
        list = List.find_by(id: params[:list_id])
        list.destroy if list.present?
    end

    def save_position
        args = list_params
        selectedList = List.find_by(id: params[:list_id])
        return if selectedList.blank? || selectedList[:position] == args[:position]

        board_lists = List.where('lists.id != ? AND lists.board_id = ?', args[:list_id], args[:board_id]).to_a

        board_lists.insert(args[:position], selectedList)
        board_lists.each_with_index do |list, index|
            list[:position] = index
            list.save
        end

        render :json => board_lists
    end

    private

    def list_params
        params.require(:list).permit(:name, :user_id, :board_id, :id, :list_id, :position)
    end
end
