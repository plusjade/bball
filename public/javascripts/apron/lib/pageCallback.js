/* register a callback for whenever a page is loaded
   by defining a function named for the page name.
 */
var pageCallback = {  
  teams : function(){
    console.log("teams page callback");
    $("#teams_dropdown").listview("refresh");
  },
  
  team_roster_page : function(){
    $("#team_roster").listview("refresh");
  },
  
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
  },
  
  analytics : function(){
    App.build();
  },
  
  log_page : function(){
    console.log("log_page");
    $("#log").listview("refresh");
  }
  
}