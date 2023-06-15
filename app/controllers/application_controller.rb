class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    skip_before_action :verify_authenticity_token

    before_action :configure_permitted_parameters, if: :devise_controller?

    respond_to :json

    def index
        render 'application/index'
    end

    def render_json_error(message = 'Server Error!', status = :unprocessable_entity)
        render json: {error: message}, status: status
    end

    def render_response(data = {})
        data[:error].blank? ? render(json: data) : render_json_error(data[:error])
    end

    protected
    def configure_permitted_parameters
        added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
        devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
        devise_parameter_sanitizer.permit :sign_up, keys: [:email, :password]
    end
end
