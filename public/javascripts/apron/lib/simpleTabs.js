var simpleTabs = {
  $list : null,
  $wrapper : null,
  init : function(list, wrapper){
    simpleTabs.$list = list;
    simpleTabs.$wrapper = wrapper;
    
    simpleTabs.$list.find("a").tap(function(e){
      simpleTabs.showTab($(this));
      e.preventDefault();
    });
    
    simpleTabs.showFirstTab();
  },
  
  showFirstTab : function(){
    simpleTabs.showTab(simpleTabs.$list.find("a").first());
  },
  
  showTab : function(node){
    var callback = node.attr("rel");
    if(simpleTabs.hasOwnProperty(callback) && typeof simpleTabs[callback] === "function"){
      simpleTabs[callback]();
    }
    simpleTabs.clear();
    simpleTabs.$wrapper.show();
    var tabIndex = node.parent().index();
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
    $("#new_game").find("select")
      .empty()
      .append('<option value="">select team</option>')
      .append($.tmpl("<option>${name}</option>", Team.data));
  }
  
}