/*
  Game model handles Game session creation
  Game data is stored in localStorage. this is a wrapper
  for setting and getting the current game session data.
 */
var Game = {
  current : {},
  action : null,
  player : null,
  
  /* Load current game. This should be set in localStorage */
  load : function(cb){
    if(localStorage["current"] === null || typeof localStorage["current"] === "undefined"){
      console.log("No current game");
      return false;
    }
    else{
      console.log("Loading current game.");
      Game.current = JSON.parse(localStorage["current"]);
      GameView.show();
      if(typeof cb === "function") cb();
      return true;
    }
  },
    
  
  /* create a new game session */
  create : function(home, away){
    if(Team.exists(home) && Team.exists(away)){
      Game.current = {
        home : Team.get(home),
        away : Team.get(away),
        timestamp : new Date().toString(),
        id : Game.makeid()
      }
      localStorage["current"] = JSON.stringify(Game.current);
      return true;
    }
    else{
      return false;
    }
  },
  
  destroy : function(){
    localStorage.removeItem("current");
    Game.current = {}
  },
  
  setAction : function(action){
    Game.action = action;
    $("#hopper").show();
    $("#hopper").find("span").html(action+ " &#10144; <em>now select a player...</em>");
    
    if(Game.player) Stat.record(Game.player, Game.action);
  },  
  
  setPlayer : function(side, player){
    Game.player = side+"."+player;
    $("#hopper").show();
    $("#hopper").find("span").html(side+ " #"+ player + " &#10144; <em>now select an action...</em>");
    
    if(Game.action) Stat.record(Game.player, Game.action);
  },
  
  exists : function(){
    return Game.current.hasOwnProperty("id");
  },
  
  /* generate random Game id. namespace to avoid collisions but
  we aren't storing more than one game currently */
  makeid : function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 7; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }



}