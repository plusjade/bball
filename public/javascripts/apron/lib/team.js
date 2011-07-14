/*
  This is an ad-hoc data model for the UI api.
  Ideally it will interface between :
    * localStorage
    * Javascript Objects
    * Server Database
    
  Properties
    name, String
    players, Array
  
  Note that there is no Player model, players are currently part of the team Model
*/
var Team = {
  data : null,
  /* deletes is a queuing array that stores deleted teams.
     the array is sent to the server via the sync function  */
  deletes : [],
  errors : [],
  
 /* initialize the Team Model
    This primarily means fetching the data from the server
    and preparing the DOM.
 */
  init : function(){
    Team.load(function(){

      /* add a team */
      $("#add_team_wrapper").find("button").tap(function(e){
        var name = $("#add_team_wrapper").find("input").val();
        if(Team.create(name)){
          Team.refreshList();
          Status.show("Team Created!");
        }
        else{
          Status.show(Team.errors.join(", "));
        }
        e.preventDefault();
        return false;
      })
     
      /* build the list and add handler */
      Team.refreshList();
      $("#teams_dropdown").find("a").live("tap", function(e){
        TeamView.show($(this).text());
        e.preventDefault();
        return false;
      })
      
      console.log("Team model initialized!");
    });
  },
  
  /* refresh the team list from the data */
  refreshList : function(){
    $("#teams_dropdown").empty().prepend($.tmpl("teamDropTmpl", Team.data));
    $("#teams_dropdown").listview("refresh");
  },
   
 /* intitially load our data from the server */
  load : function(cb){
    $.getJSON("/teams", function(data){
      Team.data = data;
      if(typeof cb === "function") cb();
    })
  },
  
 /* get a specific team by teamname */
  get : function(name){
    var data = {};
    $.each(Team.data, function(i,team){
      if (team.name === name){
        data = team; return false;
      }
    });
    return data;
  },
  
 /* get players from a team */  
  getPlayers : function(name){
    var team = Team.get(name)
    if(team.hasOwnProperty("players"))
      return team.players;
    else
      return [];
  },

 /* set a team's name and players */
  set : function(name, players){
    $.each(Team.data, function(i, team){
      if (team.name === name){
        Team.data[i] = {name : name, players : players}
        return false;
      }
    })
  },
  
  /* create a new team */
  create : function(name, players){
    var name = name.toLowerCase();
    if(Team.exists(name)){
      Team.errors.push("Team exists");
      return false;
    }
    else {
      Team.data.push({name : name, players : players ? players : []})
      return true;
    }
  },
  
  /* delete a team */
  destroy : function(name){
    var name = name.toLowerCase();
    $.each(Team.data, function(i, team){
      if (team.name === name){
        Team.data.splice(i,1);
        Team.deletes.push(name);
        return false
      }
    })
    return true;
  },
  
  /* checks if a team exists */
  exists : function(name){
    return Team.get(name).hasOwnProperty("name");
  },
  
 /* sync the Team Model to the server */
  sync : function(){
    $.ajax({
      url : "/teams",
      type : "post",
      dataType : "json",
      data : {'teams' : Team.data, "deletes[]" : Team.deletes},
      success : function(rsp){
        // remember to refresh the deletes on successful delete
        console.log(rsp);
      }
    })
  }
  
}