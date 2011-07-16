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
  
  /* send game data to the server */
  sync : function(){
    if(!Game.exists()) return false;

    $.ajax({
      url : "/games",
      type : "post",
      dataType : "json",
      data : {"data" : localStorage},
      success : function(rsp){
        console.log(rsp);
      }
    })
  },
  
  
  setAction : function(action){
    Game.action = action;
    $("#hop").html('<span class="ui-btn-text">' + action+ " &#10144; <em>now select a player...</em></span>");
    
    if(Game.player) Stat.record(Game.player, Game.action);
  },  
  
  setPlayer : function(side, player){
    Game.player = side+"."+player;
    $("#hop").html('<span">' + side+ " #"+ player + " &#10144; <em>now select an action...</em></span>");
    
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
  },
  
  /* parse recorded stats into an object that is used to render the data nicely
     Note how localStorage is a key : value store.
     This basically parses localStorage stat key:values into 
     an more convenient object :
     {
        player# : {
          action1 : aggregrate count,
          action2 : aggregrate count,
        }
     }
   */
  parseStats : function(){
  // defensive actions only  
    var analysis = {}    
    var x = Action.data.length;
  
  // aggregate all actions from the given Action.data object.
    for(var action in Action.data){
      var homeKey = Game.current.id + ".home." + Action.data[action].id;
      if(Action.data[action].type === "shot"){
        aggregate(homeKey, "make");
        aggregate(homeKey, "miss");
      }else{
        aggregate(homeKey);
      }
    }

  // aggregate player action counts from the specified action key/value
    function aggregate(homeKey, value){
      if(value) homeKey += ("-"+value);
      if(localStorage.hasOwnProperty(homeKey)){
        var data = localStorage[homeKey].split("|");
        var counts = {}
        var x = data.length-1; // subtract empty last array val.
        var val; 
        
      // parse data to retrive players => action counts
        while(x--){
          val = data[x];
          if (counts[val]) counts[val] += 1;
          else counts[val] = 1;
        }
        
      // add action's counts to player object
        for(var player in counts){
          if(!analysis[player]) analysis[player] = {}
          analysis[player][value?action+"-"+value:action] = counts[player];
        }
      }
    }
    console.log(analysis);
    return analysis;
  }


}