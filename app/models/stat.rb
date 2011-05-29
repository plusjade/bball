class Stat

  include DataMapper::Resource

  property :id, Serial

  belongs_to :game
  belongs_to :team
  belongs_to :player
end
