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
    $("#hop").html('<span>--- ' +action+ " ---</span>");
    
    if(Game.player) Stat.record(Game.player, Game.action);
  },  
  
  setPlayer : function(side, playerNum){
    Game.player = side+"."+playerNum;
    var player = Game.getPlayer(side, playerNum);
    $("#hop").html('<span>--- ' +player.name+ " #" +player.number+ " ---</span>");
    
    if(Game.action) Stat.record(Game.player, Game.action);
  },
  
  log : function(player, action){
    var playa = Game.getPlayer(player.split(".")[0], player.split(".")[1]);
    var greet = "#" +playa.number+ "-" +playa.name+ " " +action+ "!";
    $("#hop").find("span").html(greet);
      
    $("#hop").animate({'marginTop': '-=30px'}, 100, "linear")
      .animate({'marginTop': '+=30px'}, 100, "linear");
    var message = '<a href="#" rel="'+Stat.asString(player, action)+'">' +greet+ ' <span class="statjoy">UNDO</span></a>';
    $node = $("<li>"+message+"</li>");
    $("#log").prepend($node).listview("refresh");
  },
  
  refresh : function(){
    Game.action = null;
    Game.player = null;
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
   // TODO: should need to pass home/away to parse both sides.
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
    return analysis;
  },
  
  // gets a player from the current game
  getPlayer : function(side, number){
    var foundPlayer = {}
    $.each(Game.current[side].players, function(i, player){
      if (player.number === +number){
        foundPlayer = player;
        return false;
      }
    })
    return foundPlayer;
  }


}