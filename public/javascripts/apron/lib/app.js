var App = {
  gameId : null,
  action : null,
  player : null,
  $actions : null,
  $players : null,
  $playersBench : null,
  
  start : function(gameId){
    App.gameId = gameId;
    
    console.log(Game.data[gameId]);
    
    if(Game.data[gameId]){
      console.log("existing game!");
      App.init();
      App.updateScores();
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
        
          localStorage[App.gameId] = JSON.stringify(game);

          App.init();
        });
      });    

    }
  },

  init : function(){
    $("#playerTemplate").template("playerTemplate");
    App.$actions = $("#actions_wrapper");
    App.$players = $("#players_game");
    App.$playersBench = $("#players_bench");

  /* select action interface */  
    App.$actions.find("a").live("click", function(e){
      App.$actions.find("a").removeClass("active");
      App.$players.find("a.player").removeClass("active");
      App.$players.find("div.make_miss").hide();
      $(this).addClass("active");
      App.action = this.id;
      
      e.preventDefault();
      return false;
    })
          
  /* select player interface */  
    App.$players.find("a.player").live("click", function(e){
      if(!App.action) return false;

    // set active player
      App.player = this.id;
      App.$players.find("a.player").removeClass("active");
      $(this).addClass("active");
      
      if(Action.data[App.action].type === "shot"){
        $(this).parent().siblings("div.make_miss").show();
      }else{
        Stat.record(App.player, $(this).parent().attr("class"), App.action);
      }
      
      e.preventDefault();
      return false;
    })
    
  /* record a make or miss */
    App.$players.find("div.make_miss > a").live("click", function(e){
      var pair = $(this).attr("rel").split(".");
      Stat.record(App.player, pair[0], App.action, pair[1]);
      
      e.preventDefault();
      return false;
    })
    
  /* bench interface */
    $("a.bench").click(function(e){
      var side = $(this).hasClass("home") ? "home" : "away";
      App.$playersBench.removeClass("home_bg away_bg").addClass(side+"_bg").show();
    
      App.$playersBench.find("div.home").hide();
      App.$playersBench.find("div.away").hide();
    
      App.$playersBench.find("div."+side).show();

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
        Stat.record.apply(this, Stat.parse($(this).attr("rel")));
        $li.remove();
      }else{
        Stat.unRecord.apply(this, Stat.parse($(this).attr("rel")));
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
    App.loadTeam("home", home, Team.data[home]);  
    App.loadTeam("away", away, Team.data[away]);  
  },
  
  loadTeam : function(side, team, players){
    $("#"+side+"_name").find("span").text(team);
    App.$players.find("div."+side).empty();
    App.$playersBench.find("div."+side).empty();
    
    $.tmpl("playerTemplate", players).appendTo(App.$players.find("div."+side));
    $.tmpl("playerTemplate", players).appendTo(App.$playersBench.find("div."+side));
  },
  
  updateScores : function(){
    var homeScore = 0;
    var awayScore = 0;
    for(var shot in Action.pointValues) {

      var homeKey = App.gameId + ".home." + shot + ".make";
      if(localStorage.hasOwnProperty(homeKey)){
        homeScore += +Action.pointValues[shot] *(localStorage[homeKey].split("|").length - 1);
      }
      
      var awayKey = App.gameId + ".away." + shot + ".make";
      if(localStorage.hasOwnProperty(awayKey)){
        awayScore += +Action.pointValues[shot] *(localStorage[awayKey].split("|").length - 1);
      }
    }

    $("#home_score").text(homeScore);  
    $("#away_score").text(awayScore);  
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
    App.$actions.find("a").removeClass("active");
    App.$players.find("div.make_miss").hide();
    App.action = null;
    App.player = null;
  }
  
}