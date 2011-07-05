var simpleTabs = {
  $list : null,
  $wrapper : null,
  init : function(list, wrapper){
    simpleTabs.$list = list;
    simpleTabs.$wrapper = wrapper;
    
    simpleTabs.$list.find("li").tap(function(){
      simpleTabs.showTab($(this));
      return false;
    });
    
    simpleTabs.showFirstTab();
  },
  
  showFirstTab : function(){
    var $first = simpleTabs.$list.find("li:first");
    simpleTabs.showTab($first);
  },
  
  showTab : function(node){
    simpleTabs.clear();
    
    simpleTabs.$wrapper.show();
    var tabIndex = node.index();
    simpleTabs.$wrapper.find("div.tabs").eq(tabIndex).show();
    node.addClass("active");
    
    $("#title").removeClass("active")
  },
  
  clear : function(){
    simpleTabs.$list.find("li").removeClass("active");
    simpleTabs.$wrapper.find("div.tabs").hide();
    simpleTabs.$wrapper.hide();
  }
}