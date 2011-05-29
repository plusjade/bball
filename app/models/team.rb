class Team

  include DataMapper::Resource

  property :id, Serial
  property :name, String, :required => true
  
  has n, :players
  has n, :games, :child_key => [:home_team_id, :away_team_id]
end
