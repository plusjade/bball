var TeamPlayers = {
  teamName : null,
  
  init : function(teamName){
    TeamPlayers.teamName = teamName;
    $("#rosterTemplate").template("rosterTemplate");
    TeamPlayers.loadTeam();
    
  /* add. */
    $("#team_roster").find("div.add").tap(function(){
      var number = $(this).parent().find("input").first().val();
      var name = $(this).parent().find("input").last().val();
      $.tmpl("rosterTemplate", [{name: name, number: number}]).appendTo($("#team_roster").find("div.players"));
      TeamPlayers.update();
    })
  
  /* delete */  
    $("#team_roster").find("div.delete").live("tap", function(){
      $(this).parent().remove();
      TeamPlayers.update();
    })
  },

  loadTeam : function(){
    $.tmpl("rosterTemplate", Team.data[TeamPlayers.teamName]).appendTo($("#team_roster").find("div.players").empty());
  /* Keyup. Todo: need to bind this to new players too. */
    $("#team_roster").find("div.players").find("input").keyup(function(){
      TeamPlayers.update();
    })
    
    $("#title").addClass("active").text("team: "+ TeamPlayers.teamName)
    simpleTabs.clear();
  },
  
  update : function (){
    var players = []
    $("#team_roster").find("div.players").find("div.row").each(function(){
      var number = $(this).find("input").first().val();
      var name = $(this).find("input").last().val();
      players.push({number:number, name:name})
    })
    
    Team.data[TeamPlayers.teamName] = players;
    console.log(Team.data[TeamPlayers.teamName]);
  }
}