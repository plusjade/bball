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
    $("a.close, a.close_lick").click(function(e){
      $("#analytics").hide();
      $("#analytics").find("p").empty();
      e.preventDefault();
      return false;
    });
    
  /* open analytics */
    $("#licks").click(function(e){
      App.build();
      $("#analytics").show();
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
  },
  
  build : function(){
    var $table = $("<table></table>").appendTo($("#analytics").find("p"));
    var data = App.analyze();
    var cache = "";
    var points = 0;
    var totalMiss = 0;
    var totalMake = 0;
    var tpct;
    for(var action in Action.data){
      cache += "<th>"+Action.data[action].id+"</th>";
    }
    $table.append("<tr><th></th><th></th><th>pts</th><th>TOT</th>"+cache+"</tr>");
    

    for(var player in data){
      points = 0, totalMiss = 0, totalMake = 0, cache = "";
      
      for(var action in Action.data){
        if(Action.data[action].type === "shot"){
          var miss = data[player][action+".miss"];
          var make = data[player][action+".make"];
          var pct = 0
          miss = miss?miss:0;
          make = make?make:0;
          totalMiss += miss;
          totalMake += make;
          points += +make*Action.data[action].value;
          if(make >0) pct = Math.round((parseInt(make)/parseInt(make+miss))*100);

          cache += "<td>"+make+"/"+(+make+miss)+"<br/>"+ pct +"%</td>";
        }else{
          cache += "<td>"+(data[player][action]?data[player][action]:0)+"</td>";
        }
      }
      
      tpct = Math.round((parseInt(totalMake)/parseInt(totalMake+totalMiss))*100);
      $table.append("<tr><td>"+ player +"</td><td>name</td><td>"+points+"</td><td>"+totalMake+"/"+(+totalMiss+totalMake)+"<br/>"+tpct+"%</td>"+cache+"</tr>");
    }

  },
  
  analyze : function(){
  // defensive actions only  
    var analysis = {}    
    var x = Action.data.length;
  
  // aggregate all actions from the given Action.data object.
    for(var action in Action.data){
      var homeKey = App.gameId + ".home." + Action.data[action].id;
      if(Action.data[action].type === "shot"){
        aggregate(homeKey, "make");
        aggregate(homeKey, "miss");
      }else{
        aggregate(homeKey);
      }
    }

  // aggregate player action counts from the specified action key/value
    function aggregate(homeKey, value){
      if(value) homeKey += ("."+value);
      if(localStorage.hasOwnProperty(homeKey)){
        var data = localStorage[homeKey].split("|"); 
        var counts = {}
        var x = data.length-1; // subtract empty last array val.
        var val; 
        
      // parse data to retrive players => action counts
        while(x--){
          val = data[x];
          if (counts[val]) counts[val] += 1;
          else counts[val] = 1;
        }
        
      // add action's counts to player object
        for(var player in counts){
          if(!analysis[player]) analysis[player] = {}
          analysis[player][value?action+"."+value:action] = counts[player];
        }
      }
    }
    
    return analysis;
  }
  
}