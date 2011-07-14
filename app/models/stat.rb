class Stat

  include DataMapper::Resource

  property :id, Serial
  property :side, String
  property :action, String
  property :value, Text
  
  belongs_to :game
end
