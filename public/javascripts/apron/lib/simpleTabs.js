var simpleTabs = {
  $list : null,
  $wrapper : null,
  init : function(list, wrapper){
    simpleTabs.$list = list;
    simpleTabs.$wrapper = wrapper;
    
    simpleTabs.$list.find("a").tap(function(e){
      simpleTabs.showTab($(this).parent());
      e.preventDefault();
    });
    
    simpleTabs.showTabByName("teams");
  },
    
  showTabByName : function(name){
    var node = simpleTabs.$list.find("li[rel='"+name+"']")
    if(node.length > 0){
      simpleTabs.showTab(node);
    }
  },
  
  showTab : function(node){
    var callback = node.attr("rel");
    if(simpleTabs.hasOwnProperty(callback) && typeof simpleTabs[callback] === "function"){
      simpleTabs[callback]();
    }
    simpleTabs.clear();
    simpleTabs.$wrapper.show();
    var tabIndex = node.index();
    simpleTabs.$wrapper.find("div.tabs").eq(tabIndex).show();
    node.addClass("active");
  },
  
  clear : function(){
    simpleTabs.$list.find("a").removeClass("active");
    simpleTabs.$wrapper.find("div.tabs").hide();
    simpleTabs.$wrapper.hide();
  },
  
 // teams callback
  teams : function(){

  },
  
  new_game : function(){
    if (Game.exists()){
      $("#new_game").hide();
      $("#existing_game").show();
    }
    else{
      $("#new_game").show();
      $("#existing_game").hide();
      
      $("#new_game").find("select")
        .empty()
        .append('<option value="">select team</option>')
        .append($.tmpl("<option>${name}</option>", Team.data));
    }
  }
  
}