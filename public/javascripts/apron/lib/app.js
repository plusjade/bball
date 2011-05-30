var app = {
  gameId : null,
  $actions : null,
  $playersGame : null,
  $playersBench : null,
  
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  start : function(gameId){
    app.gameId = "game." + gameId;

    if(localStorage[app.gameId]){
      console.log("existing game!");
      app.init();
      app.updateScores();
    }else{
      console.log("load game from database!");
      /*
      to get to this page a game must have been created so
      we'll likely have game data in localStorage. actually should be required
      so we may not need this.
      */
      game = {id: gameId}
      $.getJSON("/teams/1.json", function(data){
        game["home"] = data["team"];
        game["homePlayers"] = data["players"];
      
        $.getJSON("/teams/2.json", function(data){
          game["away"] = data["team"];
          game["awayPlayers"] = data["players"];
        
          localStorage[app.gameId] = JSON.stringify(game);

          app.init();
        });
      });    

    }
  },

  init : function(){
    $("#playerTemplate").template("playerTemplate");
    app.$actions = $("#actions_wrapper");
    app.$playersGame = $("#players_game");
    app.$playersBench = $("#players_bench");

  /* actions interface */  
    app.$actions.find("div.actions > div").live("click", function(){
      app.$actions.find("div").removeClass("active");
      $(this).addClass("active");
    })
          
  /* record the data */  
    app.$playersGame.find("div.js_record").live("click", function(){
      if(app.$actions.find("div.active").length === 0) return false;
      app.recordData(app.keyize($(this)));
      app.updateScores();
      console.log(localStorage);

      app.$actions.find("div").removeClass("active");
    })
    
  /* bench interface */
    $("a.bench").click(function(){
      var side = $(this).hasClass("home") ? "home" : "away";
      app.$playersBench.removeClass("home_bg away_bg").addClass(side+"_bg").show();
    
      app.$playersBench.find("div.home").hide();
      app.$playersBench.find("div.away").hide();
    
      app.$playersBench.find("div."+side).show();

      return false;
    });
  
    $("a.close").click(function(){
      $(this).parent().hide();
      return false;
    });
    
  /* load teams */
    var tmp = JSON.parse(localStorage[app.gameId]);
    app.loadTeam("home", tmp["home"], tmp["homePlayers"]);  
    app.loadTeam("away", tmp["away"], tmp["awayPlayers"]);  
  },
  
  loadTeam : function(side, team, players){
    $("#"+side+"_name").find("span").text(team["name"]);
    app.$playersGame.find("div."+side).empty();
    app.$playersBench.find("div."+side).empty();
    
    $.tmpl("playerTemplate", players).appendTo(app.$playersGame.find("div."+side));
    $.tmpl("playerTemplate", players).appendTo(app.$playersBench.find("div."+side));
    app.bindHover();
  },
  
  bindHover : function(){
    app.$playersGame.find("div.player").hover(function(){
      var actionType = app.$actions.find("div.active").first().attr("rel");
      if(actionType === "shot"){
        $(this).find("div.assign").hide();
      }
    },function(){
      $(this).find("div").show();
    });
  },  
  
  keyize : function($node){
    var val = $node.attr("rel");
    var player = $node.parent()[0].id;
    var side = $node.parent().parent().hasClass("home") ? "home" : "away";
    var action = app.$actions.find("div.active").first()[0].id;
    return app.gameId + "." +  side + "." + player + "." + action + "." + val;
  },
  
  recordData : function(key){
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = 1;
    }else{
      localStorage[key] = +localStorage[key] + 1;
    }
  },
  
  updateScores : function(){
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
  }

}