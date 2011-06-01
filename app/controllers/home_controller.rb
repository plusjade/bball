class HomeController < ApplicationController
  def index
    @teams = Team.all
  end
  
  def account
    
  end
end
