var app = {
  
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  keyize : function($node){
    var val = $node.attr("rel");
    var player = $node.parent()[0].id;
    var action = $actionsW.find("div.action.active").first()[0].id;
    return player + "." + action + "." + val;
  },
  
  recordData : function(key){
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = 1;
    }else{
      localStorage[key] = +localStorage[key] + 1;
    }
  },
  
  updateScore : function(){
    var score = 0;
    for(var key in localStorage) {
      if(localStorage.hasOwnProperty(key)){
        var a = key.split(".");
        var player = a[0], action = a[1], type = a[2];
        console.log(action +":" + type + ", val: " + localStorage[key]);

        if(type === "make" && app.pointValues.hasOwnProperty(action)){
          score += (+localStorage[key]*app.pointValues[action]);
        }
      }
    }
    $("#score").find("div.us").text(score);  
  }
  
}