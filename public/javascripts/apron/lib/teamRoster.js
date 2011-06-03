var teamRoster = {
  team : null,
  
  update : function (){
    var players = []
    $("#team_roster").find("div.players").find("div.row").each(function(){
      var number = $(this).find("input").first().val();
      var name = $(this).find("input").last().val();
      players.push({number:number, name:name})
    })
    console.log(players);
  }
}