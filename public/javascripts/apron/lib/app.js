var App = {

  build : function(){
    var $table = $("<table></table>").appendTo($("#analytics_page").find("div.stat_grid").empty());
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
    

    for(var playerNum in data){
      points = 0, totalMiss = 0, totalMake = 0, cache = "";
      var player = Game.getPlayer("home", playerNum);
      
      for(var action in Action.data){
        if(Action.data[action].type === "shot"){
          var miss = data[playerNum][action+"-miss"];
          var make = data[playerNum][action+"-make"];
          var pct = 0
          miss = miss?miss:0;
          make = make?make:0;
          
          // don't count freethow's in total percentage
          if(action !== "freethrow"){
            totalMiss += miss;
            totalMake += make;
          }
          points += +make*Action.data[action].value;
          if(+make >0){
            pct = Math.round((parseInt(make)/parseInt(make+miss))*100);
          }

          cache += "<td>"+make+"/"+(+make+miss)+"<br/>"+ pct +"%</td>";
        }else{
          cache += "<td>"+(data[playerNum][action]?data[playerNum][action]:0)+"</td>";
        }
      }
      
      tpct = (totalMake>0) ? Math.round((parseInt(totalMake)/parseInt(totalMake+totalMiss))*100) : 0 ;
      
      $table.append("<tr><td>#"+ player.number +"</td><td>"+ player.name +"</td><td>"+points+"</td><td>"+totalMake+"/"+(+totalMiss+totalMake)+"<br/>"+tpct+"%</td>"+cache+"</tr>");
    }

  }
  
  
}