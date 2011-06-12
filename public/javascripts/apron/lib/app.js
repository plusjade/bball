var app = {
  gameId : null,
  action : null,
  player : null,
  $actions : null,
  $players : null,
  $playersBench : null,
  
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  actions : {
    "three" : {id: "three", name : "3pt Shot", state : "offense", type : "shot", value : 3},
    "two" : {id: "two", name : "2pt Shot", state : "offense", type : "shot", value : 2},
    "layup" : {id: "layup", name : "2pt Layup", state : "offense", type : "shot", value : 2},
    "freethrow" : {id: "freethrow", name : "Freethrow", state : "offense", type : "shot", value : 1},
    "orebound" : {id: "orebound", name : "O Rebound", state : "offense", type : "bool", value : null},
    "assist" : {id: "assist", name : "Assist", state : "offense", type : "bool", value : null},
    "turnover" : {id: "turnover", name : "Turnover", state : "offense", type : "bool", value : null},
  
    "steal" : {id: "steal", name : "Steal", state : "defense", type : "bool", value : null},
    "block" : {id: "block", name : "Block", state : "defense", type : "bool", value : null},
    "drebound" : {id: "drebound", name : "D Rebound", state : "defense", type : "bool", value : null},
    "foul" : {id: "foul", name : "Foul", state : "defense", type : "bool", value : null},
    "charge" : {id: "charge", name : "Charge", state : "defense", type : "bool", value : null}
  },
  
  start : function(gameId){
    app.gameId = gameId;
    
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
    app.$players = $("#players_game");
    app.$playersBench = $("#players_bench");

  /* select action interface */  
    app.$actions.find("a").live("click", function(e){
      app.$actions.find("a").removeClass("active");
      app.$players.find("a.player").removeClass("active");
      app.$players.find("div.make_miss").hide();
      $(this).addClass("active");
      app.action = this.id;
      
      e.preventDefault();
      return false;
    })
          
  /* select player interface */  
    app.$players.find("a.player").live("click", function(e){
      if(!app.action) return false;

    // set active player
      app.player = this.id;
      app.$players.find("a.player").removeClass("active");
      $(this).addClass("active");
      
      if(app.actions[app.action].type === "shot"){
        $(this).parent().siblings("div.make_miss").show();
      }else{
        app.recordStat(app.player, $(this).parent().attr("class"), app.action);
      }
      
      e.preventDefault();
      return false;
    })
    
  /* record a make or miss */
    app.$players.find("div.make_miss > a").live("click", function(e){
      var pair = $(this).attr("rel").split(".");
      app.recordStat(app.player, pair[0], app.action, pair[1]);
      
      e.preventDefault();
      return false;
    })
    
  /* bench interface */
    $("a.bench").click(function(e){
      var side = $(this).hasClass("home") ? "home" : "away";
      app.$playersBench.removeClass("home_bg away_bg").addClass(side+"_bg").show();
    
      app.$playersBench.find("div.home").hide();
      app.$playersBench.find("div.away").hide();
    
      app.$playersBench.find("div."+side).show();

      e.preventDefault();
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
    $("a.undo").live("click", function(e){
      $li = $(this).parent();
      
      if($li.hasClass("undone")){
        app.recordStat.apply(this, app.statParse($(this).attr("rel")));
        $li.remove();
      }else{
        app.unRecordStat.apply(this, app.statParse($(this).attr("rel")));
        $li.find("a").text("REDO");
      }
      $li.toggleClass("undone");
      
      e.preventDefault();
      return false;
    });
    
  /* close bench */
    $("a.close").click(function(e){
      $(this).parent().hide();
      e.preventDefault();
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
    app.$players.find("div."+side).empty();
    app.$playersBench.find("div."+side).empty();
    
    $.tmpl("playerTemplate", players).appendTo(app.$players.find("div."+side));
    $.tmpl("playerTemplate", players).appendTo(app.$playersBench.find("div."+side));
  },
  
  
  recordStat : function(player, side, action, value){
    var key = app.toKey(side, action, value);
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = player+"|";
    }else{
      localStorage[key] += player+"|";
    }
    
    action = app.actions[action];
    app.log('<span>'+side+ " #"+ player + " &#10144; " + action.name + (value ? (" "+value) : "") + '!</span> <a href="#" class="undo" rel="'+app.statToString(player, side, action.id, value)+'">UNDO</a>');
    
    app.updateScores();
    app.refresh();
    console.log("blah");
    console.log(localStorage);
  },

  unRecordStat : function(player, side, action, value){
    var key = app.toKey(side, action, value);
    if(key && player && typeof localStorage[key] !== "undefined"){
      localStorage[key] = localStorage[key].replace(player+"|", "");
      app.updateScores();
    }
  },

  updateScores : function(){
    var homeScore = 0;
    var awayScore = 0;
    for(var shot in app.pointValues) {

      var homeKey = app.gameId + ".home." + shot + ".make";
      if(localStorage.hasOwnProperty(homeKey)){
        homeScore += +app.pointValues[shot] *(localStorage[homeKey].split("|").length - 1);
      }
      
      var awayKey = app.gameId + ".away." + shot + ".make";
      if(localStorage.hasOwnProperty(awayKey)){
        awayScore += +app.pointValues[shot] *(localStorage[awayKey].split("|").length - 1);
      }
    }

    $("#home_score").text(homeScore);  
    $("#away_score").text(awayScore);  
  },

  toKey : function(side, action, value){
    var key = app.gameId + "." +  side + "." + action;
    if(value) key += "." + value;
    return key;
  },
  
  statToString : function(player, side, action, value){
    return [player, side, action, value].join(".");
  },
  
  statParse : function(stat){
    return stat.split(".");
  },
  
  log : function(message){
    $node = $("<li>"+message+"</li>");
    $("#log").prepend($node);
    $node.animate( {'marginLeft': '-=20px'}, 100, "linear" );
    $node.animate( {'marginLeft': '+=20px'}, 100, "linear" );
    $node.animate( {'marginLeft': '-=20px'}, 100, "linear" );
    $node.animate( {'marginLeft': '+=20px'}, 100, "linear" );
  },

  refresh : function(){
    app.$actions.find("a").removeClass("active");
    app.$players.find("div.make_miss").hide();
    app.action = null;
    app.player = null;
  }
  
}