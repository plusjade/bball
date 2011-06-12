Stat = {
  
  record : function(player, side, action, value){
    var key = Stat.keyize(side, action, value);
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = player+"|";
    }else{
      localStorage[key] += player+"|";
    }
    
    action = Action.data[action];
    App.log('<span>'+side+ " #"+ player + " &#10144; " + action.name + (value ? (" "+value) : "") + '!</span> <a href="#" class="undo" rel="'+Stat.asString(player, side, action.id, value)+'">UNDO</a>');
    
    App.updateScores();
    App.refresh();
    console.log("blah");
    console.log(localStorage);
  },

  unRecord : function(player, side, action, value){
    var key = Stat.keyize(side, action, value);
    if(key && player && typeof localStorage[key] !== "undefined"){
      localStorage[key] = localStorage[key].replace(player+"|", "");
      App.updateScores();
    }
  },

  keyize : function(side, action, value){
    var key = App.gameId + "." +  side + "." + action;
    if(value) key += "." + value;
    return key;
  },
  
  asString : function(player, side, action, value){
    return [player, side, action, value].join(".");
  },
  
  parse : function(statString){
    return statString.split(".");
  }
  
  
}