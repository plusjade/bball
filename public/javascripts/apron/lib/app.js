var app = {
  $actionsW : null,
  $playersGame : null,
  $playersBench : null,
  
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  init : function(){
    app.$actionsW = $("#actions_wrapper");
    app.$playersGame = $("#players_game");
    app.$playersBench = $("#players_bench");

  /* actions interface */  
    app.$actionsW.find("div.action").live("click", function(){
      app.$actionsW.find("div.action").removeClass("active");
      app.$playersGame.addClass("active");
      $(this).addClass("active");
    })
          
  /* record the data */  
    app.$playersGame.find("div.js_record").live("click", function(){
      if(app.$actionsW.find("div.action.active").length === 0) return false;
      app.recordData(app.keyize($(this)));
      app.updateScore();
      console.log(localStorage);

      app.$playersGame.removeClass("active");
      app.$actionsW.find("div.action").removeClass("active");
    })
  },
  
  bindHover : function(){
    app.$playersGame.find("div.action").hover(function(){
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
    $("#home_score").text(score);  
  },
  
  loadTeam : function(side, data){
    app.$playersGame.find("div."+side).empty();
    app.$playersBench.find("div."+side).empty();
    
    $.tmpl("playerTemplate", data).appendTo(app.$playersGame.find("div."+side));
    $.tmpl("playerTemplate", data).appendTo(app.$playersBench.find("div."+side));
    app.bindHover();
  },
  
  showTeam : function(side){
    app.$playersGame.find("div.home").hide();
    app.$playersGame.find("div.away").hide();
    app.$playersBench.find("div.home").hide();
    app.$playersBench.find("div.away").hide();
    
    if(side === "home"){
      app.$playersGame.find("div.home").show();
      app.$playersBench.find("div.home").show();
    }else{
      app.$playersGame.find("div.away").show();
      app.$playersBench.find("div.away").show();
    }
  }
}