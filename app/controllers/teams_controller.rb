class TeamsController < ApplicationController

  def index
    @teams = Team.all
    render :json => @teams
  end
  
  def show
    @team = Team.get!(params[:id])
    
    @players = @team.players(:limit => 5)
    
    
    render :json => {
      :team => @team,
      :players => @players
    }
  end
  
end
