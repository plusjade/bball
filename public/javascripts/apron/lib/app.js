var App = {
  gameId : 123,

  log : function(message){
    $("#hop").html(message);
    $node = $("<li>"+message+"</li>");
    $("#log").append($node).listview("refresh");
    $node.animate( {'marginLeft': '-=20px'}, 100, "linear" );
    $node.animate( {'marginLeft': '+=20px'}, 100, "linear" );
  },

  refresh : function(){
    Game.action = null;
    Game.player = null;
    $("#hopper").hide();
    $("#hopper").find("span").empty();
  },
  
  
  
  
  build : function(){
    var $table = $("<table></table>").appendTo($("#analytics").find("p").empty());
    var data = Game.parseStats();
    var cache = "";
    var points = 0;
    var totalMiss = 0;
    var totalMake = 0;
    var tpct = 0;
    for(var action in Action.data){
      cache += "<th>"+Action.data[action].id+"</th>";
    }
    $table.append("<tr><th></th><th></th><th>pts</th><th>TOT</th>"+cache+"</tr>");
    

    for(var player in data){
      points = 0, totalMiss = 0, totalMake = 0, cache = "";
      
      for(var action in Action.data){
        if(Action.data[action].type === "shot"){
          var miss = data[player][action+"-miss"];
          var make = data[player][action+"-make"];
          var pct = 0
          miss = miss?miss:0;
          make = make?make:0;
          totalMiss += miss;
          totalMake += make;
          points += +make*Action.data[action].value;
          if(make >0) pct = Math.round((parseInt(make)/parseInt(make+miss))*100);

          cache += "<td>"+make+"/"+(+make+miss)+"<br/>"+ pct +"%</td>";
        }else{
          cache += "<td>"+(data[player][action]?data[player][action]:0)+"</td>";
        }
      }
      
      if(totalMake >0 ) tpct = Math.round((parseInt(totalMake)/parseInt(totalMake+totalMiss))*100);
      $table.append("<tr><td>"+ player +"</td><td>name</td><td>"+points+"</td><td>"+totalMake+"/"+(+totalMiss+totalMake)+"<br/>"+tpct+"%</td>"+cache+"</tr>");
    }

  }
  
  
}