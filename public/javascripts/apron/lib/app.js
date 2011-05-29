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
    
  /* load teams */
    app.loadTeam("home", game["home"], game["homePlayers"]);  
    app.loadTeam("away", game["away"], game["awayPlayers"]);  
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
    var side = $node.parent().parent().hasClass("home") ? "home" : "away";
    var action = app.$actionsW.find("div.action.active").first()[0].id;
    return "game." + game["id"] + "." +  side + "." + player + "." + action + "." + val;
  },
  
  recordData : function(key){
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = 1;
    }else{
      localStorage[key] = +localStorage[key] + 1;
    }
  },
  
  updateScore : function(){
    var homeScore = 0;
    var awayScore = 0;
    for(var key in localStorage) {
      if(localStorage.hasOwnProperty(key)){
        var a = key.split(".");

        if(a.length === 6){ // 6 length means this is in stat format
          // TODO: scope to this game only
          var side = a[2], player = a[3], action = a[4], type = a[5];

          if(type === "make" && app.pointValues.hasOwnProperty(action)){
            var tally = (+localStorage[key]*app.pointValues[action]);
            if(side === "home") homeScore += tally;
            else awayScore += tally;
          }
        }
      }
    }
    $("#home_score").text(homeScore);  
    $("#away_score").text(awayScore);  
  },
  
  loadTeam : function(side, team, players){
    $("#teams").find("."+side).find(".team_name").text(team["name"]);
    app.$playersGame.find("div."+side).empty();
    app.$playersBench.find("div."+side).empty();
    
    $.tmpl("playerTemplate", players).appendTo(app.$playersGame.find("div."+side));
    $.tmpl("playerTemplate", players).appendTo(app.$playersBench.find("div."+side));
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