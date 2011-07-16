/* register a callback for whenever a page is loaded
   by defining a function named for the page name.
 */
var pageCallback = {  
  new_game : function(){
    if (Game.exists()){
      $("#new_game_box").hide();
      $("#existing_game_box").show();
    }
    else{
      $("#existing_game_box").hide();
      $("#new_game_box").show();
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