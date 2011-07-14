

var CompletedGame = {
  data : null,
  
  /* intitially load our data from the server */
   load : function(cb){
     $.getJSON("/games", function(data){
       CompletedGame.data = data;
       if(typeof cb === "function") cb();
     })
   }
  
}