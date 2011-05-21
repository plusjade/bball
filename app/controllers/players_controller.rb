class PlayersController < ApplicationController

  def index
    @team = Team.get!(params[:team_id])
    
    @players = @team.players
    render :json => @players
  end
end
