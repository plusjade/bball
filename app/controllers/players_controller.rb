class PlayersController < ApplicationController

  def index
    @team = Team.get!(params[:team_id])
    
    @players = @team.players(:limit => 5)
    render :json => @players
  end
end
