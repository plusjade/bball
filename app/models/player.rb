class Player

  include DataMapper::Resource

  property :id, Serial
  property :name, String, :default => ""
  property :number, Integer, :unique => :team_id, :required => true
  
  #belongs_to :team
  
  has n, :stats
end
