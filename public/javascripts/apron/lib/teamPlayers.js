var teamPlayers = {
  teamName : null,
  
  init : function(teamName){
    teamPlayers.teamName = teamName;
    $("#rosterTemplate").template("rosterTemplate");
    teamPlayers.loadTeam();
    
  /* add. */
    $("#team_roster").find("div.add").click(function(){
      var number = $(this).parent().find("input").first().val();
      var name = $(this).parent().find("input").last().val();
      $.tmpl("rosterTemplate", [{name: name, number: number}]).appendTo($("#team_roster").find("div.players"));
      teamPlayers.update();
    })
  
  /* delete */  
    $("#team_roster").find("div.delete").live("click", function(){
      $(this).parent().remove();
      teamPlayers.update();
    })
  },

  loadTeam : function(){
    $.tmpl("rosterTemplate", team.data[teamPlayers.teamName]).appendTo($("#team_roster").find("div.players").empty());
  /* Keyup. Todo: need to bind this to new players too. */
    $("#team_roster").find("div.players").find("input").keyup(function(){
      teamPlayers.update();
    })
    
    $("#title").addClass("active").text("team: "+ teamPlayers.teamName)
    simpleTabs.clear();
  },
  
  update : function (){
    var players = []
    $("#team_roster").find("div.players").find("div.row").each(function(){
      var number = $(this).find("input").first().val();
      var name = $(this).find("input").last().val();
      players.push({number:number, name:name})
    })
    
    team.data[teamPlayers.teamName] = players;
    console.log(team.data[teamPlayers.teamName]);
  }
}