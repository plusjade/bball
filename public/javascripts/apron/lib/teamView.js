/* 
  Views help help display the corresponding data model in the DOM 

*/

var TeamView = {
  name : null,
  $roster : null,
  
 /* show a team in the DOM */
  show : function(name){
    $.mobile.changePage("#team_roster_page", {changeHash : false});
    name = name.toLowerCase()
    TeamView.name = name;
    $("#team_roster_wrapper").find("h1").text(name);
    var $newPlayer = '<li data-theme="d"><a><input type="text" value="" maxlength="2" /><input type="text" value="" /></a><a href="#" class="add" data-icon="plus" data-theme="a"></a></li>';
    TeamView.$roster = $("#team_roster").empty();
    TeamView.$roster.append($.tmpl("rosterTemplate", Team.getPlayers(name))).show();
    TeamView.$roster.prepend($newPlayer);
    
    /* delete a team */
    $("#team_roster_wrapper").find("button.delete_team").tap(function(e){
      var name = $(this).siblings("h1").text();
      if(Team.destroy(name)){
        Team.refreshList();
        $.mobile.changePage("#teams_page")
        Status.show("Team destroyed!")
      }
      else{
        Status.show(Team.errors);
      }
      e.preventDefault();
    })
    
    /* sync to server (probably want to automate this) */
    $("#team_roster_wrapper").find("button.sync_team").tap(function(e){
      TeamView.update()
      Team.sync();
      e.preventDefault();
      return false;
    });
    
    /* add a player */
    TeamView.$roster.find("a.add").tap(function(){
      var number = $(this).parent().find("input").first().val();
      var name = $(this).parent().find("input").last().val();
      TeamView.$roster.append($.tmpl("rosterTemplate", [{name: name, number: number}]));
      TeamView.update();
      TeamView.$roster.listview("refresh");
      $(this).parent().find("input").val("");
      return false;
    })

    /* delete a player */  
    TeamView.$roster.find("a.delete").live("tap", function(){
      $(this).parent().remove();
      TeamView.update();
      return false;
    })
  },
  
  
 /* extract the player input-data from the DOM */  
  extract : function(){
    var players = []
    TeamView.$roster.find("li.player").each(function(){
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