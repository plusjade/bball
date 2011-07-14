var Status = {

  // hack this out better later
  show : function(msg){
    $("div.ui-loader").find("h1").text(msg);
    $("div.ui-loader").find("span").hide();
    $.mobile.showPageLoadingMsg();
    setTimeout("$.mobile.hidePageLoadingMsg()", 1500);
  },
  
  
  bak_showSubmit: function(){
    $('#status-bar div.responding.active').remove();
    $('#submitting').show();
  },
  
  bak_showResponse: function(rsp){
    var blah = { status: "bad", msg: "There was a problem!"};
    if (rsp && rsp.status) blah.status = rsp.status;
    if (rsp && rsp.msg) blah.msg = rsp.msg;

    $('#submitting').hide();
    $('div.responding.active').remove();
    $('div.responding').hide().clone().addClass('active ' + blah.status).html(blah.msg).show().insertAfter('div.responding');
    setTimeout('$("div.responding.active").fadeOut(4000)', 1900);    
  },
  
}