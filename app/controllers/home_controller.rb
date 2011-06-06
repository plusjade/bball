class HomeController < ApplicationController
  
  def index
    
  end
  
  def account
    
  end
  
  def game
    @teams = Team.all
  end

end
