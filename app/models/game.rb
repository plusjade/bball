class Game

  include DataMapper::Resource

  property :id, Serial
  property :uid, String, :length => 11, :unique => true
  property :home, Json, :lazy => false
  property :away, Json, :lazy => false
  property :timestamp, DateTime
  
  has n, :stats
end
