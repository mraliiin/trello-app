class SessionsController < ApplicationController
    def create
        user = User.find_by(email: params[:session][:email].downcase)
        if user && user.authenticate(params[:session][:password])
            sign_in user
            render_response user
        else
            render_response :error => [ 'Invalid email/password combination' ]
        end
    end

    def destroy
        sign_out
        redirect_to root_url
    end

end
