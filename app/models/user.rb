class User < ActiveRecord::Base
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

    validates :username, :email, uniqueness: true

    has_many :boards
    has_many :lists
end
