Stat = {
  
 /* player = "{side}.{number}"
    action = "{action}{.value}"
 */
  record : function(player, action){
    var key = Stat.keyize(player, action);
    var playerId = player.split(".")[1];
    
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = playerId+"|";
    }else{
      localStorage[key] += playerId+"|";
    }
    
    var side = player.split(".")[0];
    var actionName = action.split(".")[0];
    var value = (typeof action.split(".")[1] == "undefined") ? "" : action.split(".")[1];
    var actionOb = Action.data[actionName];
    App.log('<span>'+ player + " &#10144; " + actionOb.name + " " + value + '!</span> <a href="#" class="undo" rel="'+Stat.asString(player, action)+'">UNDO</a>');
    
    App.updateScores();
    App.refresh();
    console.log("blah");
    console.log(localStorage);
  },

  unRecord : function(player, action){
    var key = Stat.keyize(player, action);
    var playerId = player.split(".")[1];
    
    if(key && player && typeof localStorage[key] !== "undefined"){
      localStorage[key] = localStorage[key].replace(playerId+"|", "");
      App.updateScores();
    }
  },

  // build the key used to store this player-action
  keyize : function(player, action){
    return [App.gameId, player.split(".")[0], action].join(".");
  },
  
  // stringify a player-action 
  asString : function(player, action){
    return [player, action].join(".");
  },
  
 /* parse asString into player-action  */  
  parse : function(statString){
    var data = statString.split(".");
    var value = (typeof data[3] === "undefined") ? "" : data[3];
    return [data[0]+"."+data[1], data[2]+value];
  }
  
  
}