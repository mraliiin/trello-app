class Card < ActiveRecord::Base
    validates :title, presence: true

    default_scope { order(position: :asc, id: :asc) }

    belongs_to :list
end
