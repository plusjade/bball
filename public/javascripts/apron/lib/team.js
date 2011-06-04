var team = {
  data : {
    "pandabots" : [
      {name:"jade", number : "12"},
      {name:"bologna", number : "7"},
      {name:"bobberto", number : "55"},
    ],
    "gametime" : [
      {name:"joe", number : "12"},
      {name:"mike", number : "7"},
      {name:"adam", number : "55"},
    ],
    "supernova" : [
      {name:"cooper", number : "12"},
      {name:"danny", number : "7"},
      {name:"brandon", number : "55"},
    ],
    "team-supreme" : [
      {name:"cup", number : "12"},
      {name:"chair", number : "7"},
      {name:"samson", number : "55"},
    ]
  },
  
  get : function(name){
    if(team.data[name]){
      return team.data[name];
    }
    return [];
  },

  init : function(){
    $("#teamTemplate").template("teamTemplate");

    var qteams = []
    for(var name in team.data) {
      if(team.data.hasOwnProperty(name)){ 
        qteams.push({name:name});
      }
    }
    $.tmpl("teamTemplate", qteams).appendTo($("#teams_list"));    


    $("#teams_pane").find("div.team").click(function(){
      var team = $(this).text().toLowerCase().replace(" ", "-");
      teamPlayers.init(team);
      
    })
  }
}