/* 
  Views help help display the corresponding data model in the DOM 

*/

var TeamView = {
  name : null,
  $roster : null,
  
 /* show a team in the DOM */
  show : function(name){
    $("#rosterTemplate").template("rosterTemplate");
    TeamView.name = name;
    TeamView.$roster = $("#team_roster");
    TeamView.$roster.empty();

    var $newPlayer = $('<div id="new_player"><div class="row"><div class="number"><input type="text" value="00" maxlength="2" /></div><div class="name"><input type="text" value="name" /></div><div class="add">&#10010;</div></div></div>');
    TeamView.$roster.prepend($newPlayer);
    TeamView.$roster.prepend('<h1>'+name+'</h1> <button class="sync_team">Save</button> <button class="delete_team">delete</button>');

    var $playersWrap = $('<div class="players"></div>');  
    $playersWrap.append($.tmpl("rosterTemplate", Team.getPlayers(name)));
    TeamView.$roster.append($playersWrap).show();
    simpleTabs.clear();

    
    /* delete a team */
    TeamView.$roster.find("button.delete_team").tap(function(e){
      var name = $(this).siblings("h1").text();
      if(Team.destroy(name)){
        Team.refreshList();
        console.log("team destroyed!");
      }
      else{
        console.log(Team.errors);
      }
      e.preventDefault();
    })
    
    /* add a player */
    $newPlayer.find("div.add").tap(function(){
      var number = $(this).parent().find("input").first().val();
      var name = $(this).parent().find("input").last().val();
      $.tmpl("rosterTemplate", [{name: name, number: number}]).appendTo($("#team_roster").find("div.players"));
      TeamView.update();
    })

    /* delete a player */  
    TeamView.$roster.find("div.delete").live("tap", function(){
      $(this).parent().remove();
      TeamView.update();
    })
    
    /* sync to server (probably want to automate this) */
    TeamView.$roster.find("button.sync_team").tap(function(e){
      Team.sync();
      e.preventDefault();
    });
  },
  
  
 /* extract the player input-data from the DOM */  
  extract : function(){
    var players = []
    TeamView.$roster.find("div.players").find("div.row").each(function(){
      var number = $(this).find("input").first().val();
      var name = $(this).find("input").last().val();
      players.push({number:number, name:name})
    })
    return players;
  },

 /* update the Team Model with data extracted from the DOM */  
  update : function (){
    Team.set(TeamView.name, TeamView.extract());
  }
  
  
}