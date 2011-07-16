/*
  Game view is a view class which sets up the DOM for Game session 
  functionality
 */
var GameView = {
  $actions : null,
  $players : null,
  $playersBench : null,

  /* show the GameView panel in the DOM */
  show : function(){
    if(!Game.exists()) return false;
    
    GameView.$actions = $("#actions_wrapper");
    GameView.$players = $("#players_game");
    GameView.$playersBench = $("#players_bench");

  /* select action interface */  
    GameView.$actions.find("a").live("tap", function(e){
      Game.setAction(this.id);
      e.preventDefault();
      return false;
    })
          
  /* select player interface */  
    GameView.$players.find("a.player").live("tap", function(e){
      var side = $(this).parent().hasClass("home") ? "home" : "away";
      Game.setPlayer(side, this.id);
      e.preventDefault();
      return false;
    })
        
  /* bench interface */
    $("a.bench").tap(function(e){
      var side = $(this).hasClass("home_bg") ? "home" : "away";
      GameView.$playersBench.show();
    
      GameView.$playersBench.find("div.home").hide();
      GameView.$playersBench.find("div.away").hide();
      GameView.$playersBench.find("div."+side).show();

      e.preventDefault();
      return false;
    });
  
  /* toggle logger */
    $("div.tab").find("span").tap(function(){
      $("div.tab").find("span").show();
      $(this).hide();
      
      var action = $(this).attr("rel");
      $("#log").removeClass("expand contract").addClass(action);
    });
  
  /* undo/redo logged actions */  
    $("a.undo").live("tap", function(e){
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
    $("a.close").tap(function(e){
      $(this).parent().hide();
      e.preventDefault();
      return false;
    });
  
  /* close analytics */
    $("a.close_lick").tap(function(e){
      $("#analytics").hide();
      $("#analytics").find("p").empty();
      e.preventDefault();
      return false;
    });
    
  /* open analytics */
    $("#licks").tap(function(e){
      App.build();
      $("#analytics").show();
      e.preventDefault();
      return false;
    });
    
    /* show teams from the current game in the DOM */
    $.each(["home", "away"], function(i, side){
      $("#"+side+"_name").text(Game.current[side].name + " Bench");
      GameView.$players.find("div."+side).empty().append($.tmpl("playerTemplate", Game.current[side].players));
      GameView.$playersBench.find("div."+side).empty().append($.tmpl("playerTemplate", Game.current[side].players));
    })
    
    GameView.updateScores();
  },
  
  
  /* update the scoreboard in the DOM 
     Note this is a convenience to the user.
     this doesnt affect logging and storing actual stats
   */
  updateScores : function(){
    var homeScore = 0;
    var awayScore = 0;
    for(var shot in Action.pointValues) {

      var homeKey = Game.current.id + ".home." + shot + "-make";
      if(localStorage.hasOwnProperty(homeKey)){
        homeScore += +Action.pointValues[shot] *(localStorage[homeKey].split("|").length - 1);
      }
      
      var awayKey = Game.current.id + ".away." + shot + "-make";
      if(localStorage.hasOwnProperty(awayKey)){
        awayScore += +Action.pointValues[shot] *(localStorage[awayKey].split("|").length - 1);
      }
    }

    $("#home_score").text(homeScore);  
    $("#away_score").text(awayScore);  
  }
  
}