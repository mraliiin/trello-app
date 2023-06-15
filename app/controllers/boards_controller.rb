class BoardsController < ApplicationController
    before_filter :authenticate_user!

    def index
        boards = current_user.boards.all
        render :json => boards
    end

    def show
        render :json => current_user.boards.find(params[:id])
    end

    def create
        board = current_user.boards.new(board_params)
        if board.save
            render_response board
        else
            render_response :error => board.errors.full_messages
        end
    end

    def update
        board = current_user.boards.find(params[:id])
        if board.update(board_params)
            render_response board
        else
            render_response :error => board.errors.full_messages
        end
    end

    def destroy
        board = current_user.boards.find(params[:id])
        board.destroy if board.present?
    end

    private

    def board_params
        params.require(:board).permit(:name, :user_id)
    end
end
