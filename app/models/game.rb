class Game

  include DataMapper::Resource

  property :id, Serial

  #belongs_to :team
  belongs_to :home_team, Team
  belongs_to :away_team, Team
  
  #has 1, :home_team, Team, :child_key => [:home_team_id]
  #has 1, :away_team, Team, :child_key => [:away_team_id]
  has n, :stats
end
