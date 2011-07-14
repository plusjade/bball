class GamesController < ApplicationController

  def index
    @games = Game.all
    render :json => @games  
  end
  
  def show
    @game = Game.get!(params[:id])
    render :json => @game
  end
  
  def create
    if params[:data] && params[:data]["current"]
      game_data = ActiveSupport::JSON.decode(params[:data]["current"])
      game = Game.first_or_create(:uid => game_data["id"])
      game.timestamp = game_data["timestamp"]
      game.home = game_data["home"]
      game.away = game_data["away"]
      
      if game.save
        params[:data].delete("current")
        # keys come in as : uid.side.action
        # ex: NBmDHav.home.freethrow-make
        params[:data].each_pair do |key, value|
          keys = key.split(".")
          game.stats.create({
            :side => keys[1],
            :action => keys[2],
            :value => value,
          })
        end
      end
      render :json => {:status => "good", :msg => "yay"}
    end
  end
  
  
end
