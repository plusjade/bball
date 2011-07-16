var pageCallback = {  
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
        .append($.tmpl("<option>${name}</option>", Team.data))
        .selectmenu("refresh");
    }
  },
  
  completed_games : function(){
    CompletedGame.load(function(){
      $("#games_pane")
        .empty()
        .append($.tmpl("completedGamesTmpl", CompletedGame.data))
        .listview("refresh");
    })
  }
  
}