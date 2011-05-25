var app = {
  $actionsW : null,
  $playersW : null,
  
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  init : function(){
    app.$actionsW = $("#actions_wrapper");
    app.$playersW = $("#players_wrapper");

  /* actions interface */  
    app.$actionsW.find("div.action").live("click", function(){
      app.$actionsW.find("div.action").removeClass("active");
      app.$playersW.addClass("active");
      $(this).addClass("active");
    })
          
  /* record the data */  
    app.$playersW.find("div.js_record").live("click", function(){
      if(app.$actionsW.find("div.action.active").length === 0) return false;
      app.recordData(app.keyize($(this)));
      app.updateScore();
      console.log(localStorage);

      app.$playersW.removeClass("active");
      app.$actionsW.find("div.action").removeClass("active");
    })
  },
  
  bindHover : function(){
    app.$playersW.find("div.action").hover(function(){
      var actionType = app.$actionsW.find("div.action.active").first().attr("rel");
      
      $(this).find("div.number").hide();
      if(actionType === "shot"){
        $(this).find("div.assign").hide();
      }
    },function(){
      $(this).find("div.number").show();
      $(this).find("div.assign").show();
    });
  },
  
  keyize : function($node){
    var val = $node.attr("rel");
    var player = $node.parent()[0].id;
    var action = app.$actionsW.find("div.action.active").first()[0].id;
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