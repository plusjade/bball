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
  
  def create 
    teams = params[:teams]
    teams.each_value do |team|
      players = []
      team["players"].each_value do |player|
        players.push({
          :name => player["name"],
          :number => player["number"].to_i
        })
      end if team["players"].is_a?(Hash)

      puts team["name"]
      puts players.to_yaml
      
      t = Team.first(:name => team["name"])
      if t
        t.update(:players => players)
      else
        Team.create(:name => team["name"], :players => players)
      end  
    end
    
    params[:deletes].each do |name|
      team = Team.first(:name => name)
      team.destroy if team
    end if params[:deletes].is_a?(Array)
    
    render :json => {:status => "good", :msg => "Team Synced"}
  end
  
  
  def update
    
    
    
  end
  
  
end
