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
      if(Action.data[action].state !== "offense")
        continue;      
      cache += "<th>"+Action.data[action].id+"</th>";
    }
    $table.append("<tr><th>Name</th><th>Pts</th><th>Total %</th>"+cache+"</tr>");
    
    var x = 0;
    for(var playerNum in data){
      points = 0, totalMiss = 0, totalMake = 0, cache = "";
      var player = Game.getPlayer("home", playerNum);

      for(var action in Action.data){
        if(Action.data[action].state !== "offense")
          continue;
          
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

          cache += "<td><span class='ratio'>"+make+"/"+(+make+miss)+"</span> - <span class='pct'>"+pct+"%</span></td>";
        }else{
          cache += "<td>"+(data[playerNum][action]?data[playerNum][action]:0)+"</td>";
        }
      }
      
      tpct = (totalMake>0) ? Math.round((parseInt(totalMake)/parseInt(totalMake+totalMiss))*100) : 0 ;
      
      $table.append("<tr class='"+((x%2===0) ? "even" : "odd")+ "'><td style='text-align:left'>#"+ player.number +" - "+ player.name +"</td><td>"+points+"</td><td><span class='ratio'>"+totalMake+"/"+(+totalMiss+totalMake)+"</span> - <span class='pct'>"+tpct+"%</span></td>"+cache+"</tr>");
      ++x;
    }
    
  }
  
  
}