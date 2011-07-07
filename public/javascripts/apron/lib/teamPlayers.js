var TeamPlayers = {
  teamName : null,
  $roster : null,
  init : function(teamName){
    TeamPlayers.teamName = teamName;
    $("#rosterTemplate").template("rosterTemplate");
    
    TeamPlayers.$roster = $("#team_roster");
    TeamPlayers.$roster.empty();
    var $newPlayer = $('<div id="new_player"><div class="row"><div class="number"><input type="text" value="00" maxlength="2" /></div><div class="name"><input type="text" value="name" /></div><div class="add">&#10010;</div></div></div>');
    TeamPlayers.$roster.prepend($newPlayer);
    TeamPlayers.$roster.prepend("<h1>"+TeamPlayers.teamName+"</h1>");
    
    TeamPlayers.loadTeam();
    
  /* add. */
    $newPlayer.find("div.add").tap(function(){
      var number = $(this).parent().find("input").first().val();
      var name = $(this).parent().find("input").last().val();
      $.tmpl("rosterTemplate", [{name: name, number: number}]).appendTo($("#team_roster").find("div.players"));
      TeamPlayers.update();
    })
  
  /* delete */  
    TeamPlayers.$roster.find("div.delete").live("tap", function(){
      $(this).parent().remove();
      TeamPlayers.update();
    })
  },

  loadTeam : function(){
    var $playersWrap = $('<div class="players"></div>');  
    $.tmpl("rosterTemplate", Team.data[TeamPlayers.teamName]).appendTo($playersWrap);

  /* Keyup. Todo: need to bind this to new players too. */
    $playersWrap.find("input").keyup(function(){
      TeamPlayers.update();
    })
    
    TeamPlayers.$roster.append($playersWrap).show();
    simpleTabs.clear();
  },
  
  update : function (){
    var players = []
    TeamPlayers.$roster.find("div.players").find("div.row").each(function(){
      var number = $(this).find("input").first().val();
      var name = $(this).find("input").last().val();
      players.push({number:number, name:name})
    })
    
    Team.data[TeamPlayers.teamName] = players;
    console.log(Team.data[TeamPlayers.teamName]);
  }
}