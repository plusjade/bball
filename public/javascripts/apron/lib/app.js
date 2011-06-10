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
    
    console.log(game.data[gameId]);
    
    if(game.data[gameId]){
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

  /* select action interface */  
    app.$actions.find("div.actions > a").live("click", function(e){
      app.$actions.find("a").removeClass("active");
      $(this).addClass("active");
      app.$playersGame.find("div.make_miss").hide();
      
      e.preventDefault();
      return false;
    })
          
  /* select player interface */  
    app.$playersGame.find("div.number").live("click", function(){
      if(app.$actions.find("a.active").length === 0) return false;
      // set active player
      app.$playersGame.find("div.player").removeClass("active");
      $(this).parent().addClass("active");

      var actionType = app.$actions.find("a.active").first().attr("rel");
      if(actionType === "shot"){
        console.log("shot!");
        $(this).parent().parent().parent().find("div.make_miss").show();
      }else{
        app.recordData(app.keyize($(this)));
        console.log(localStorage);
        app.$actions.find("a").removeClass("active");        
      }
    })
    
    app.$playersGame.find("div.make_miss > div").live("click", function(){
      app.$playersGame.find("div.make_miss").hide();
      var pair = $(this).attr("rel").split(".");
      var val = pair[0];
      var side = pair[1];
      var player = app.$playersGame.find("div.player.active")[0].id;
      var action = app.$actions.find("a.active").first()[0].id;
      var key = app.gameId + "." +  side + "." + player + "." + action + "." + val;
      
      app.recordData(key);
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
  
  /* close bench */
    $("a.close").click(function(){
      $(this).parent().hide();
      return false;
    });

  /* toggle logger */
    $("div.tab").find("span").click(function(){
      $("div.tab").find("span").show();
      $(this).hide();
      
      var action = $(this).attr("rel");
      $("#log").removeClass("expand contract").addClass(action);
    });
  
  /* undo/redo logged actions */  
    $("a.undo").live("click", function(){
      $li = $(this).parent();
      var key = $li.find("span").text();

      if($li.hasClass("undone")){
        app.recordData(key);
        $li.remove();
      }else{
        app.unRecordData(key);
        $li.find("a").text("REDO");
      }
      $li.toggleClass("undone");
      return false;
    });
    
  /* load teams */
    var home = "pandabots";
    var away = "gametime";
    app.loadTeam("home", home, team.data[home]);  
    app.loadTeam("away", away, team.data[away]);  
  },
  
  loadTeam : function(side, team, players){
    $("#"+side+"_name").find("span").text(team);
    app.$playersGame.find("div."+side).empty();
    app.$playersBench.find("div."+side).empty();
    
    $.tmpl("playerTemplate", players).appendTo(app.$playersGame.find("div."+side));
    $.tmpl("playerTemplate", players).appendTo(app.$playersBench.find("div."+side));
    app.bindHover();
  },
  
  bindHover : function(){
    
  },  
  
  keyize : function($node){
    var val = $node.attr("rel");
    var player = $node.parent()[0].id;
    var side = $node.parent().parent().hasClass("home") ? "home" : "away";
    var action = app.$actions.find("a.active").first()[0].id;
    return app.gameId + "." +  side + "." + player + "." + action + "." + val;
  },
  
  recordData : function(key){
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = 1;
    }else{
      localStorage[key] = +localStorage[key] + 1;
    }

    app.updateScores();
    app.log('<span>'+key+'</span> <a href="#" class="undo">UNDO</a>');
  },

  unRecordData : function(key){
    if(!key) return false;
    if(typeof localStorage[key] !== "undefined"){
      if(localStorage[key] === 1){
        localStorage.removeItem(key);
      }else{
        localStorage[key] = +localStorage[key] - 1;
      }
    }
    app.updateScores();
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
  },
  
  log : function(message){
    $("#log").prepend("<li>"+message+"</li>");
    $("#log").find("li.highlight").show();
    setTimeout('$("#log").find("li.highlight").fadeOut(4000)', 1200);
  }

}