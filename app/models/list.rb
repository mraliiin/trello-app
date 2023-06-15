class List < ActiveRecord::Base
    validates :name, presence: true

    default_scope { order(position: :asc, id: :asc) }

    belongs_to :user
    belongs_to :board
    has_many :cards
end
