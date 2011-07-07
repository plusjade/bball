var Team = {
  data : {
    "pandabots" : [
      {name:"Jade", number : "12"},
      {name:"Tony", number : "7"},
      {name:"Bobbert", number : "55"},
      {name:"Tom", number : "35"},
      {name:"Brandon", number : "17"},
    ],
    "gametime" : [
      {name:"joe", number : "9"},
      {name:"mike", number : "7"},
      {name:"adam", number : "22"},
      {name:"Paul", number : "80"},
      {name:"Russel", number : "12"},
    ],
    "supernova" : [
      {name:"cooper", number : "12"},
      {name:"danny", number : "7"},
      {name:"brandon", number : "55"},
    ],
    "bulkan-ballers" : [
      {name:"cup", number : "12"},
      {name:"chair", number : "7"},
      {name:"samson", number : "55"},
    ]
  },
  
  get : function(name){
    if(Team.data[name]){
      return Team.data[name];
    }
    return [];
  },

  init : function(){
    $("#teamDropTmpl").template("teamDropTmpl");

    var qteams = []
    for(var name in Team.data) {
      if(Team.data.hasOwnProperty(name)){ 
        qteams.push({name:name});
      }
    }
    $.tmpl("teamDropTmpl", qteams).prependTo($("#teams_dropdown"));    

    $("#teams_dropdown").find("a").tap(function(e){
      var team = $(this).text().toLowerCase().replace(" ", "-");
      TeamPlayers.init(team);
      e.preventDefault();
    })
  }
}