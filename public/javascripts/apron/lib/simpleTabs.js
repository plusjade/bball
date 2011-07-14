var simpleTabs = {  
  new_game : function(){
    if (Game.exists()){
      $("#new_game").hide();
      $("#existing_game").show();
    }
    else{
      $("#new_game").show();
      $("#existing_game").hide();
      
      $("#new_game").find("select")
        .empty()
        .append('<option value="">select team</option>')
        .append($.tmpl("<option>${name}</option>", Team.data));
    }
  },
  
  completed_games : function(){
    CompletedGame.load(function(){
      console.log("loaded completd games");
      $("#games_pane").find("table").empty().append($.tmpl("completedGamesTmpl", CompletedGame.data));
    })
  }
  
}