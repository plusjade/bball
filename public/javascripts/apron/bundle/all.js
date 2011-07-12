/*!
 * jQuery Mobile v1.0b1
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a,d){if(a.cleanData){var c=a.cleanData;a.cleanData=function(e){for(var b=0,d;(d=e[b])!=null;b++)a(d).triggerHandler("remove");c(e)}}else{var b=a.fn.remove;a.fn.remove=function(e,c){return this.each(function(){c||(!e||a.filter(e,[this]).length)&&a("*",this).add([this]).each(function(){a(this).triggerHandler("remove")});return b.call(a(this),e,c)})}}a.widget=function(e,b,c){var d=e.split(".")[0],h,e=e.split(".")[1];h=d+"-"+e;if(!c)c=b,b=a.Widget;a.expr[":"][h]=function(b){return!!a.data(b,
e)};a[d]=a[d]||{};a[d][e]=function(a,e){arguments.length&&this._createWidget(a,e)};b=new b;b.options=a.extend(!0,{},b.options);a[d][e].prototype=a.extend(!0,b,{namespace:d,widgetName:e,widgetEventPrefix:a[d][e].prototype.widgetEventPrefix||e,widgetBaseClass:h},c);a.widget.bridge(e,a[d][e])};a.widget.bridge=function(e,b){a.fn[e]=function(c){var i=typeof c==="string",h=Array.prototype.slice.call(arguments,1),l=this,c=!i&&h.length?a.extend.apply(null,[!0,c].concat(h)):c;if(i&&c.charAt(0)==="_")return l;
i?this.each(function(){var b=a.data(this,e);if(!b)throw"cannot call methods on "+e+" prior to initialization; attempted to call method '"+c+"'";if(!a.isFunction(b[c]))throw"no such method '"+c+"' for "+e+" widget instance";var f=b[c].apply(b,h);if(f!==b&&f!==d)return l=f,!1}):this.each(function(){var d=a.data(this,e);d?d.option(c||{})._init():a.data(this,e,new b(c,this))});return l}};a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)};a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",
options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this);this.element=a(c);this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){var b={};a.metadata&&(b=a.metadata.get(element)[this.widgetName]);return b},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(b,c){var g=b;if(arguments.length===0)return a.extend({},this.options);if(typeof b==="string"){if(c===d)return this.options[b];g={};g[b]=c}this._setOptions(g);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b;a==="disabled"&&
this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var i=this.options[b],c=a.Event(c);c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase();d=d||{};if(c.originalEvent)for(var b=a.event.props.length,h;b;)h=a.event.props[--b],c[h]=c.originalEvent[h];this.element.trigger(c,
d);return!(a.isFunction(i)&&i.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);(function(a,d){a.widget("mobile.widget",{_getCreateOptions:function(){var c=this.element,b={};a.each(this.options,function(a){var f=c.jqmData(a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}));f!==d&&(b[a]=f)});return b}})})(jQuery);
(function(a){function d(){var d=c.width(),g=[],i=[],h;b.removeClass("min-width-"+e.join("px min-width-")+"px max-width-"+e.join("px max-width-")+"px");a.each(e,function(a,b){d>=b&&g.push("min-width-"+b+"px");d<=b&&i.push("max-width-"+b+"px")});g.length&&(h=g.join(" "));i.length&&(h+=" "+i.join(" "));b.addClass(h)}var c=a(window),b=a("html"),e=[320,480,768,1024];a.mobile.media=function(){var c={},e=a("<div id='jquery-mediatest'>"),d=a("<body>").append(e);return function(a){if(!(a in c)){var l=document.createElement("style"),
m="@media "+a+" { #jquery-mediatest { position:absolute; } }";l.type="text/css";l.styleSheet?l.styleSheet.cssText=m:l.appendChild(document.createTextNode(m));b.prepend(d).prepend(l);c[a]=e.css("position")==="absolute";d.add(l).remove()}return c[a]}}();a.mobile.addResolutionBreakpoints=function(b){a.type(b)==="array"?e=e.concat(b):e.push(b);e.sort(function(a,b){return a-b});d()};a(document).bind("mobileinit.htmlclass",function(){c.bind("orientationchange.htmlclass throttledResize.htmlclass",function(a){a.orientation&&
b.removeClass("portrait landscape").addClass(a.orientation);d()})});a(function(){c.trigger("orientationchange.htmlclass")})})(jQuery);
(function(a,d){function c(a){var b=a.charAt(0).toUpperCase()+a.substr(1),a=(a+" "+f.join(b+" ")+b).split(" "),c;for(c in a)if(e[c]!==d)return!0}var b=a("<body>").prependTo("html"),e=b[0].style,f=["webkit","moz","o"],g="palmGetResource"in window,i=window.blackberry;a.mobile.browser={};a.mobile.browser.ie=function(){for(var a=3,b=document.createElement("div"),c=b.all||[];b.innerHTML="<\!--[if gt IE "+ ++a+"]><br><![endif]--\>",c[0];);return a>4?a:!a}();a.extend(a.support,{orientation:"orientation"in
window,touch:"ontouchend"in document,cssTransitions:"WebKitTransitionEvent"in window,pushState:!!history.pushState,mediaquery:a.mobile.media("only all"),cssPseudoElement:!!c("content"),boxShadow:!!c("boxShadow")&&!i,scrollTop:("pageXOffset"in window||"scrollTop"in document.documentElement||"scrollTop"in b[0])&&!g,dynamicBaseTag:function(){var c=location.protocol+"//"+location.host+location.pathname+"ui-dir/",e=a("head base"),d=null,f="";e.length?f=e.attr("href"):e=d=a("<base>",{href:c}).appendTo("head");
var g=a("<a href='testurl'></a>").prependTo(b)[0].href;e[0].href=f?f:location.pathname;d&&d.remove();return g.indexOf(c)===0}(),eventCapture:"addEventListener"in document});b.remove();a.support.boxShadow||a("html").addClass("ui-mobile-nosupport-boxshadow")})(jQuery);
(function(a,d,c,b){function e(a){for(;a&&typeof a.originalEvent!=="undefined";)a=a.originalEvent;return a}function f(b){for(var c={};b;){var e=a.data(b,n),d;for(d in e)if(e[d])c[d]=c.hasVirtualBinding=!0;b=b.parentNode}return c}function g(){v&&(clearTimeout(v),v=0);v=setTimeout(function(){A=v=0;B.length=0;w=!1;r=!0},a.vmouse.resetTimerDuration)}function i(c,d,r){var f=!1,g;if(!(g=r&&r[c])){if(r=!r)a:{for(r=d.target;r;){if((g=a.data(r,n))&&(!c||g[c]))break a;r=r.parentNode}r=null}g=r}if(g){f=d;r=f.type;
f=a.Event(f);f.type=c;var h=f.originalEvent,j=a.event.props;if(h)for(c=j.length;c;)g=j[--c],f[g]=h[g];if(r.search(/^touch/)!==-1&&(c=e(h),r=c.touches,c=c.changedTouches,r=r&&r.length?r[0]:c&&c.length?c[0]:b)){c=0;for(h=y.length;c<h;c++)g=y[c],f[g]=r[g]}a(d.target).trigger(f);f=f.isDefaultPrevented()}return f}function h(b){var c=a.data(b.target,z);!w&&(!A||A!==c)&&i("v"+b.type,b)}function l(b){var c=e(b).touches;if(c&&c.length===1){var d=b.target,c=f(d);if(c.hasVirtualBinding)A=F++,a.data(d,z,A),v&&
(clearTimeout(v),v=0),s=r=!1,d=e(b).touches[0],x=d.pageX,u=d.pageY,i("vmouseover",b,c),i("vmousedown",b,c)}}function m(a){r||(s||i("vmousecancel",a,f(a.target)),s=!0,g())}function o(b){if(!r){var c=e(b).touches[0],d=s,h=a.vmouse.moveDistanceThreshold;s=s||Math.abs(c.pageX-x)>h||Math.abs(c.pageY-u)>h;c=f(b.target);s&&!d&&i("vmousecancel",b,c);i("vmousemove",b,c);g()}}function j(a){if(!r){r=!0;var b=f(a.target);i("vmouseup",a,b);if(!s&&i("vclick",a,b)){var c=e(a).changedTouches[0];B.push({touchID:A,
x:c.clientX,y:c.clientY});w=!0}i("vmouseout",a,b);s=!1;g()}}function p(b){var b=a.data(b,n),c;if(b)for(c in b)if(b[c])return!0;return!1}function k(){}function q(b){var c=b.substr(1);return{setup:function(){p(this)||a.data(this,n,{});a.data(this,n)[b]=!0;t[b]=(t[b]||0)+1;t[b]===1&&C.bind(c,h);a(this).bind(c,k);if(E)t.touchstart=(t.touchstart||0)+1,t.touchstart===1&&C.bind("touchstart",l).bind("touchend",j).bind("touchmove",o).bind("scroll",m)},teardown:function(){--t[b];t[b]||C.unbind(c,h);E&&(--t.touchstart,
t.touchstart||C.unbind("touchstart",l).unbind("touchmove",o).unbind("touchend",j).unbind("scroll",m));var d=a(this),e=a.data(this,n);e&&(e[b]=!1);d.unbind(c,k);p(this)||d.removeData(n)}}}var n="virtualMouseBindings",z="virtualTouchID",d="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),y="clientX clientY pageX pageY screenX screenY".split(" "),t={},v=0,x=0,u=0,s=!1,B=[],w=!1,r=!1,E=a.support.eventCapture,C=a(c),F=1,A=0;a.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,
resetTimerDuration:1500};for(var D=0;D<d.length;D++)a.event.special[d[D]]=q(d[D]);E&&c.addEventListener("click",function(b){var c=B.length,d=b.target;if(c)for(var e=b.clientX,r=b.clientY,f=a.vmouse.clickDistanceThreshold,g=d;g;){for(var h=0;h<c;h++){var j=B[h];if(g===d&&Math.abs(j.x-e)<f&&Math.abs(j.y-r)<f||a.data(g,z)===j.touchID){b.preventDefault();b.stopPropagation();return}}g=g.parentNode}},!0)})(jQuery,window,document);
(function(a,d){function c(b,c,d){var e=d.type;d.type=c;a.event.handle.call(b,d);d.type=e}a.each("touchstart touchmove touchend orientationchange throttledresize tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)};a.attrFn[c]=!0});var b=a.support.touch,e=b?"touchstart":"mousedown",f=b?"touchend":"mouseup",g=b?"touchmove":"mousemove";a.event.special.scrollstart={enabled:!0,setup:function(){function b(a,
f){e=f;c(d,e?"scrollstart":"scrollstop",a)}var d=this,e,f;a(d).bind("touchmove scroll",function(c){a.event.special.scrollstart.enabled&&(e||b(c,!0),clearTimeout(f),f=setTimeout(function(){b(c,!1)},50))})}};a.event.special.tap={setup:function(){var b=this,d=a(b);d.bind("vmousedown",function(a){function e(){g=!1;clearTimeout(k);d.unbind("vclick",f).unbind("vmousecancel",e)}function f(a){e();p==a.target&&c(b,"tap",a)}if(a.which&&a.which!==1)return!1;var g=!0,p=a.target,k;d.bind("vmousecancel",e).bind("vclick",
f);k=setTimeout(function(){g&&c(b,"taphold",a)},750)})}};a.event.special.swipe={setup:function(){var b=a(this);b.bind(e,function(c){function e(a){if(o){var b=a.originalEvent.touches?a.originalEvent.touches[0]:a;j={time:(new Date).getTime(),coords:[b.pageX,b.pageY]};Math.abs(o.coords[0]-j.coords[0])>10&&a.preventDefault()}}var m=c.originalEvent.touches?c.originalEvent.touches[0]:c,o={time:(new Date).getTime(),coords:[m.pageX,m.pageY],origin:a(c.target)},j;b.bind(g,e).one(f,function(){b.unbind(g,e);
o&&j&&j.time-o.time<1E3&&Math.abs(o.coords[0]-j.coords[0])>30&&Math.abs(o.coords[1]-j.coords[1])<75&&o.origin.trigger("swipe").trigger(o.coords[0]>j.coords[0]?"swipeleft":"swiperight");o=j=d})})}};(function(a){function b(){var a=d();a!==e&&(e=a,c.trigger("orientationchange"))}var c=a(window),d,e;a.event.special.orientationchange={setup:function(){if(a.support.orientation)return!1;e=d();c.bind("throttledresize",b)},teardown:function(){if(a.support.orientation)return!1;c.unbind("throttledresize",b)},
add:function(a){var b=a.handler;a.handler=function(a){a.orientation=d();return b.apply(this,arguments)}}};a.event.special.orientationchange.orientation=d=function(){var a=document.documentElement;return a&&a.clientWidth/a.clientHeight<1.1?"portrait":"landscape"}})(jQuery);(function(){a.event.special.throttledresize={setup:function(){a(this).bind("resize",b)},teardown:function(){a(this).unbind("resize",b)}};var b=function(){e=(new Date).getTime();f=e-c;f>=250?(c=e,a(this).trigger("throttledresize")):
(d&&clearTimeout(d),d=setTimeout(b,250-f))},c=0,d,e,f})();a.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)}}})})(jQuery);
(function(a,d,c){function b(a){a=a||location.href;return"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}var e="hashchange",f=document,g,i=a.event.special,h=f.documentMode,l="on"+e in d&&(h===c||h>7);a.fn[e]=function(a){return a?this.bind(e,a):this.trigger(e)};a.fn[e].delay=50;i[e]=a.extend(i[e],{setup:function(){if(l)return!1;a(g.start)},teardown:function(){if(l)return!1;a(g.stop)}});g=function(){function g(){var c=b(),f=n(i);if(c!==i)q(i=c,f),a(d).trigger(e);else if(f!==i)location.href=location.href.replace(/#.*/,
"")+f;j=setTimeout(g,a.fn[e].delay)}var h={},j,i=b(),k=function(a){return a},q=k,n=k;h.start=function(){j||g()};h.stop=function(){j&&clearTimeout(j);j=c};a.browser.msie&&!l&&function(){var c,d;h.start=function(){if(!c)d=(d=a.fn[e].src)&&d+b(),c=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){d||q(b());g()}).attr("src",d||"javascript:0").insertAfter("body")[0].contentWindow,f.onpropertychange=function(){try{if(event.propertyName==="title")c.document.title=f.title}catch(a){}}};
h.stop=k;n=function(){return b(c.location.href)};q=function(b,d){var g=c.document,h=a.fn[e].domain;if(b!==d)g.title=f.title,g.open(),h&&g.write('<script>document.domain="'+h+'"<\/script>'),g.close(),c.location.hash=b}}();return h}()})(jQuery,this);
(function(a){a.widget("mobile.page",a.mobile.widget,{options:{backBtnText:"Back",addBackBtn:!1,backBtnTheme:null,degradeInputs:{color:!1,date:!1,datetime:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:"number",search:!0,tel:!1,time:!1,url:!1,week:!1},keepNative:null},_create:function(){var d=this.element,c=this.options;this.keepNative=":jqmData(role='none'), :jqmData(role='nojs')"+(c.keepNative?", "+c.keepNative:"");this._trigger("beforeCreate")!==!1&&(d.find(":jqmData(role='page'), :jqmData(role='content')").andSelf().each(function(){a(this).addClass("ui-"+
a(this).jqmData("role"))}),d.find(":jqmData(role='nojs')").addClass("ui-nojs"),d.find(":jqmData(role)").andSelf().each(function(){var b=a(this),e=b.jqmData("role"),f=b.jqmData("theme");if(e==="header"||e==="footer"){b.addClass("ui-bar-"+(f||b.parent(":jqmData(role='page')").jqmData("theme")||"a"));b.attr("role",e==="header"?"banner":"contentinfo");var f=b.children("a"),g=f.hasClass("ui-btn-left"),i=f.hasClass("ui-btn-right");if(!g)g=f.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length;i||f.eq(1).addClass("ui-btn-right");
c.addBackBtn&&e==="header"&&a(".ui-page").length>1&&d.jqmData("url")!==a.mobile.path.stripHash(location.hash)&&!g&&b.jqmData("backbtn")!==!1&&(f=a("<a href='#' class='ui-btn-left' data-"+a.mobile.ns+"rel='back' data-"+a.mobile.ns+"icon='arrow-l'>"+c.backBtnText+"</a>").prependTo(b),c.backBtnTheme&&f.attr("data-"+a.mobile.ns+"theme",c.backBtnTheme));b.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({tabindex:"0",role:"heading","aria-level":"1"})}else e==="content"?(f&&b.addClass("ui-body-"+
f),b.attr("role","main")):e==="page"&&b.addClass("ui-body-"+(f||"c"));switch(e){case "header":case "footer":case "page":case "content":b.addClass("ui-"+e);break;case "collapsible":case "fieldcontain":case "navbar":case "listview":case "dialog":b[e]()}}),this._enhanceControls(),d.find(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a").not(".ui-btn").not(this.keepNative).buttonMarkup(),d.find(":jqmData(role='controlgroup')").controlgroup(),d.find("a:not(.ui-btn):not(.ui-link-inherit)").not(this.keepNative).addClass("ui-link"),
d.fixHeaderFooter())},_typeAttributeRegex:/\s+type=["']?\w+['"]?/,_enhanceControls:function(){var d=this.options,c=this;this.element.find("input").not(this.keepNative).each(function(){var b=this.getAttribute("type"),e=d.degradeInputs[b]||"text";d.degradeInputs[b]&&a(this).replaceWith(a("<div>").html(a(this).clone()).html().replace(c._typeAttributeRegex,' type="'+e+'" data-'+a.mobile.ns+'type="'+b+'" '))});var b=this.element.find("input, textarea, select, button"),e=b.not(this.keepNative),b=b.filter("input[type=text]");
b.length&&typeof b[0].autocorrect!=="undefined"&&b.each(function(){this.setAttribute("autocorrect","off");this.setAttribute("autocomplete","off")});e.filter("[type='radio'], [type='checkbox']").checkboxradio();e.filter("button, [type='button'], [type='submit'], [type='reset'], [type='image']").button();e.filter("input, textarea").not("[type='radio'], [type='checkbox'], [type='button'], [type='submit'], [type='reset'], [type='image'], [type='hidden']").textinput();e.filter("input, select").filter(":jqmData(role='slider'), :jqmData(type='range')").slider();
e.filter("select:not(:jqmData(role='slider'))").selectmenu()}})})(jQuery);
(function(a,d){a.extend(a.mobile,{ns:"",subPageUrlKey:"ui-page",nonHistorySelectors:"dialog",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",ajaxEnabled:!0,useFastClick:!0,hashListeningEnabled:!0,defaultPageTransition:"slide",minScrollBack:screen.height/2,defaultDialogTransition:"pop",loadingMessage:"loading",pageLoadErrorMessage:"Error Loading Page",gradeA:function(){return a.support.mediaquery||a.mobile.browser.ie&&a.mobile.browser.ie>=7},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,
COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},silentScroll:function(b){if(a.type(b)!=="number")b=a.mobile.defaultHomeScroll;a.event.special.scrollstart.enabled=!1;setTimeout(function(){d.scrollTo(0,b);a(document).trigger("silentscroll",
{x:0,y:b})},20);setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},normalizeRegex:/-([a-z])/g,nsNormalize:function(b){if(b)return a.camelCase(a.mobile.ns+b)}});a.fn.jqmData=function(b,c){return this.data(b?a.mobile.nsNormalize(b):b,c)};a.jqmData=function(b,c,d){return a.data(b,a.mobile.nsNormalize(c),d)};a.fn.jqmRemoveData=function(b){return this.removeData(a.mobile.nsNormalize(b))};a.jqmRemoveData=function(b,c){return a.removeData(b,a.mobile.nsNormalize(c))};a.jqmHasData=function(b,
c){return a.hasData(b,a.mobile.nsNormalize(c))};var c=a.find;a.find=function(b,d,f,g){b=b.replace(/:jqmData\(([^)]*)\)/g,"[data-"+(a.mobile.ns||"")+"$1]");return c.call(this,b,d,f,g)};a.extend(a.find,c);a.find.matches=function(b,c){return a.find(b,null,null,c)};a.find.matchesSelector=function(b,c){return a.find(c,null,null,[b]).length>0}})(jQuery,this);
(function(a,d){function c(a){var b=a.jqmData("lastClicked");b&&b.length?b.focus():(b=a.find(".ui-title:eq(0)"),b.length?b.focus():a.find(z).eq(0).focus())}function b(b){q&&(!q.closest(".ui-page-active").length||b)&&q.removeClass(a.mobile.activeBtnClass);q=null}function e(){t=!1;y.length>0&&a.mobile.changePage.apply(null,y.pop())}function f(b,d,e,f){var h=a.support.scrollTop?o.scrollTop():!0,j=b.data("lastScroll")||a.mobile.defaultHomeScroll,i=g();h&&window.scrollTo(0,a.mobile.defaultHomeScroll);j<
a.mobile.minScrollBack&&(j=0);d&&(d.height(i+h).jqmData("lastScroll",h).jqmData("lastClicked",q),d.data("page")._trigger("beforehide",null,{nextPage:b}));b.height(i+j).data("page")._trigger("beforeshow",null,{prevPage:d||a("")});a.mobile.hidePageLoadingMsg();e=(a.mobile.transitionHandlers[e||"none"]||a.mobile.defaultTransitionHandler)(e,f,b,d);e.done(function(){b.height("");j?(a.mobile.silentScroll(j),a(document).one("silentscroll",function(){c(b)})):c(b);d&&d.height("").data("page")._trigger("hide",
null,{nextPage:b});b.data("page")._trigger("show",null,{prevPage:d||a("")})});return e}function g(){var b=jQuery.event.special.orientationchange.orientation()==="portrait",c=b?screen.availHeight:screen.availWidth,b=Math.max(b?480:320,a(window).height());return Math.min(c,b)}function i(){a("."+a.mobile.activePageClass).css("min-height",g())}function h(b,c){c&&b.attr("data-"+a.mobile.ns+"role",c);b.page()}function l(a){for(;a;){if(a.nodeName.toLowerCase()=="a")break;a=a.parentNode}return a}function m(b){var b=
a(b).closest(".ui-page").jqmData("url"),c=s.hrefNoHash;if(!b||!k.isPath(b))b=c;return k.makeUrlAbsolute(b,c)}var o=a(window),j=a("html"),p=a("head"),k={urlParseRE:/^(((([^:\/#\?]+:)?(?:\/\/((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?]+)(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,parseUrl:function(a){if(typeof a==="object")return a;var a=k.urlParseRE.exec(a),b;a&&(b={href:a[0]||"",hrefNoHash:a[1]||"",hrefNoSearch:a[2]||"",domain:a[3]||"",protocol:a[4]||"",authority:a[5]||
"",username:a[7]||"",password:a[8]||"",host:a[9]||"",hostname:a[10]||"",port:a[11]||"",pathname:a[12]||"",directory:a[13]||"",filename:a[14]||"",search:a[15]||"",hash:a[16]||""});return b||{}},makePathAbsolute:function(a,b){if(a&&a.charAt(0)==="/")return a;for(var a=a||"",c=(b=b?b.replace(/^\/|\/?[^\/]*$/g,""):"")?b.split("/"):[],d=a.split("/"),e=0;e<d.length;e++){var f=d[e];switch(f){case ".":break;case "..":c.length&&c.pop();break;default:c.push(f)}}return"/"+c.join("/")},isSameDomain:function(a,
b){return k.parseUrl(a).domain===k.parseUrl(b).domain},isRelativeUrl:function(a){return k.parseUrl(a).protocol===""},isAbsoluteUrl:function(a){return k.parseUrl(a).protocol!==""},makeUrlAbsolute:function(a,b){if(!k.isRelativeUrl(a))return a;var c=k.parseUrl(a),d=k.parseUrl(b),e=c.protocol||d.protocol,f=c.authority||d.authority,g=c.pathname!=="",h=k.makePathAbsolute(c.pathname||d.filename,d.pathname);return e+"//"+f+h+(c.search||!g&&d.search||"")+c.hash},addSearchParams:function(b,c){var d=k.parseUrl(b),
e=typeof c==="object"?a.param(c):c,f=d.search||"?";return d.hrefNoSearch+f+(f.charAt(f.length-1)!=="?"?"&":"")+e+(d.hash||"")},convertUrlToDataUrl:function(a){var b=k.parseUrl(a);if(k.isEmbeddedPage(b))return b.hash.replace(/^#/,"");else if(k.isSameDomain(b,s))return b.hrefNoHash.replace(s.domain,"");return a},get:function(a){if(a===d)a=location.hash;return k.stripHash(a).replace(/[^\/]*\.[^\/*]+$/,"")},getFilePath:function(b){var c="&"+a.mobile.subPageUrlKey;return b&&b.split(c)[0].split(v)[0]},
set:function(a){location.hash=a},isPath:function(a){return/\//.test(a)},clean:function(a){return a.replace(s.domain,"")},stripHash:function(a){return a.replace(/^#/,"")},cleanHash:function(a){return k.stripHash(a.replace(/\?.*$/,"").replace(v,""))},isExternal:function(a){a=k.parseUrl(a);return a.protocol&&a.domain!==u.domain?!0:!1},hasProtocol:function(a){return/^(:?\w+:)/.test(a)},isEmbeddedPage:function(a){a=k.parseUrl(a);if(a.protocol!=="")return a.hash&&(a.hrefNoHash===u.hrefNoHash||B&&a.hrefNoHash===
s.hrefNoHash);return/^#/.test(a.href)}},q=null,n={stack:[],activeIndex:0,getActive:function(){return n.stack[n.activeIndex]},getPrev:function(){return n.stack[n.activeIndex-1]},getNext:function(){return n.stack[n.activeIndex+1]},addNew:function(a,b,c,d){n.getNext()&&n.clearForward();n.stack.push({url:a,transition:b,title:c,page:d});n.activeIndex=n.stack.length-1},clearForward:function(){n.stack=n.stack.slice(0,n.activeIndex+1)},directHashChange:function(b){var c,e,f;a.each(n.stack,function(a,d){b.currentUrl===
d.url&&(c=a<n.activeIndex,e=!c,f=a)});this.activeIndex=f!==d?f:this.activeIndex;c?b.isBack():e&&b.isForward()},ignoreNextHashChange:!1},z="[tabindex],a,button:visible,select:visible,input",y=[],t=!1,v="&ui-state=dialog",x=p.children("base"),u=k.parseUrl(location.href),s=x.length?k.parseUrl(k.makeUrlAbsolute(x.attr("href"),u.href)):u,B=u.hrefNoHash!==s.hrefNoHash,w=a.support.dynamicBaseTag?{element:x.length?x:a("<base>",{href:s.hrefNoHash}).prependTo(p),set:function(a){w.element.attr("href",k.makeUrlAbsolute(a,
s))},reset:function(){w.element.attr("href",s.hrefNoHash)}}:d;a.fn.animationComplete=function(b){return a.support.cssTransitions?a(this).one("webkitAnimationEnd",b):(setTimeout(b,0),a(this))};a.mobile.updateHash=k.set;a.mobile.path=k;a.mobile.base=w;a.mobile.urlstack=n.stack;a.mobile.urlHistory=n;a.mobile.noneTransitionHandler=function(b,c,d,e){e&&e.removeClass(a.mobile.activePageClass);d.addClass(a.mobile.activePageClass);return a.Deferred().resolve(b,c,d,e).promise()};a.mobile.defaultTransitionHandler=
a.mobile.noneTransitionHandler;a.mobile.transitionHandlers={none:a.mobile.defaultTransitionHandler};a.mobile.allowCrossDomainPages=!1;a.mobile.getDocumentUrl=function(b){return b?a.extend({},u):u.href};a.mobile.getDocumentBase=function(b){return b?a.extend({},s):s.href};a.mobile.loadPage=function(b,c){var e=a.Deferred(),f=a.extend({},a.mobile.loadPage.defaults,c),g=null,j=null,i=k.makeUrlAbsolute(b,s.hrefNoHash);if(f.data&&f.type==="get")i=k.addSearchParams(i,f.data),f.data=d;var n=k.getFilePath(i),
q=k.convertUrlToDataUrl(i);f.pageContainer=f.pageContainer||a.mobile.pageContainer;g=f.pageContainer.children(":jqmData(url='"+q+"')");w&&w.reset();if(g.length){if(!f.reloadPage)return h(g,f.role),e.resolve(i,c,g),e.promise();j=g}f.showLoadMsg&&a.mobile.showPageLoadingMsg();a.ajax({url:n,type:f.type,data:f.data,dataType:"html",success:function(d){var l=a("<div></div>"),p=d.match(/<title[^>]*>([^<]*)/)&&RegExp.$1,o=RegExp("\\bdata-"+a.mobile.ns+"url=[\"']?([^\"'>]*)[\"']?");RegExp(".*(<[^>]+\\bdata-"+
a.mobile.ns+"role=[\"']?page[\"']?[^>]*>).*").test(d)&&RegExp.$1&&o.test(RegExp.$1)&&RegExp.$1&&(b=n=k.getFilePath(RegExp.$1));w&&w.set(n);l.get(0).innerHTML=d;g=l.find(":jqmData(role='page'), :jqmData(role='dialog')").first();p&&!g.jqmData("title")&&g.jqmData("title",p);if(!a.support.dynamicBaseTag){var m=k.get(n);g.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function(){var b=a(this).is("[href]")?"href":a(this).is("[src]")?"src":"action",c=a(this).attr(b),
c=c.replace(location.protocol+"//"+location.host+location.pathname,"");/^(\w+:|#|\/)/.test(c)||a(this).attr(b,m+c)})}g.attr("data-"+a.mobile.ns+"url",k.convertUrlToDataUrl(n)).appendTo(f.pageContainer);h(g,f.role);i.indexOf("&"+a.mobile.subPageUrlKey)>-1&&(g=f.pageContainer.children(":jqmData(url='"+q+"')"));f.showLoadMsg&&a.mobile.hidePageLoadingMsg();e.resolve(i,c,g,j)},error:function(){w&&w.set(k.get());f.showLoadMsg&&(a.mobile.hidePageLoadingMsg(),a("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+
a.mobile.pageLoadErrorMessage+"</h1></div>").css({display:"block",opacity:0.96,top:o.scrollTop()+100}).appendTo(f.pageContainer).delay(800).fadeOut(400,function(){a(this).remove()}));e.reject(i,c)}});return e.promise()};a.mobile.loadPage.defaults={type:"get",data:d,reloadPage:!1,role:d,showLoadMsg:!0,pageContainer:d};a.mobile.changePage=function(c,g){if(typeof g!=="object"){var i=null;if(typeof c==="object"&&c.url&&c.type)i={type:c.type,data:c.data,forcePageLoad:!0},c=c.url;var q=arguments.length;
if(q>1){var l=["transition","reverse","changeHash","fromHashChange"],p;for(p=1;p<q;p++){var o=arguments[p];typeof o!=="undefined"&&(i=i||{},i[l[p-1]]=o)}}if(i)return a.mobile.changePage(c,i)}if(t)y.unshift(arguments);else{t=!0;var m=a.extend({},a.mobile.changePage.defaults,g);m.pageContainer=m.pageContainer||a.mobile.pageContainer;if(typeof c=="string")a.mobile.loadPage(c,m).done(function(b,c,d,e){t=!1;c.duplicateCachedPage=e;a.mobile.changePage(d,c)}).fail(function(){t=!1;b(!0);e();m.pageContainer.trigger("changepagefailed")});
else{var s=m.pageContainer,i=a.mobile.activePage,q=c.jqmData("url");k.getFilePath(q);l=n.getActive();p=n.activeIndex===0;var x=0,o=document.title,u=m.role==="dialog"||c.jqmData("role")==="dialog";s.trigger("beforechangepage");if(i&&i[0]===c[0])t=!1,s.trigger("changepage");else{h(c,m.role);m.fromHashChange&&n.directHashChange({currentUrl:q,isBack:function(){x=-1},isForward:function(){x=1}});a(document.activeElement||"").add("input:focus, textarea:focus, select:focus").blur();u&&l&&(q=l.url+v);if(m.changeHash!==
!1&&q)n.ignoreNextHashChange=!0,k.set(q);(u=c.jqmData("title")||c.children(":jqmData(role='header')").find(".ui-title").text())&&o==document.title&&(o=u);x||n.addNew(q,m.transition,o,c);document.title=n.getActive().title;a.mobile.activePage=c;m.transition=m.transition||(x&&!p?l.transition:d)||(m.role==="dialog"?a.mobile.defaultDialogTransition:a.mobile.defaultPageTransition);m.reverse=m.reverse||x<0;f(c,i,m.transition,m.reverse).done(function(){b();m.duplicateCachedPage&&m.duplicateCachedPage.remove();
j.removeClass("ui-mobile-rendering");e();s.trigger("changepage")})}}}};a.mobile.changePage.defaults={transition:d,reverse:!1,changeHash:!0,fromHashChange:!1,role:d,duplicateCachedPage:d,pageContainer:d};a("form").live("submit",function(b){var c=a(this);if(a.mobile.ajaxEnabled&&!c.is(":jqmData(ajax='false')")){var d=c.attr("method"),e=k.makeUrlAbsolute(c.attr("action"),m(c)),f=c.attr("target");!k.isExternal(e)&&!f&&(a.mobile.changePage(e,{type:d.length&&d.toLowerCase()||"get",data:c.serialize(),transition:c.jqmData("transition"),
direction:c.jqmData("direction"),reloadPage:!0}),b.preventDefault())}});a(document).bind("vclick",function(b){if((b=l(b.target))&&k.parseUrl(b.getAttribute("href")||"#").hash!=="#")a(b).closest(".ui-btn").not(".ui-disabled").addClass(a.mobile.activeBtnClass),a("."+a.mobile.activePageClass+" .ui-btn").not(b).blur()});a(document).bind(a.mobile.useFastClick?"vclick click":"click",function(c){var e=l(c.target);if(e){var f=a(e),g=function(){window.setTimeout(function(){b(!0)},200)};if(f.is(":jqmData(rel='back')"))return window.history.back(),
!1;if(a.mobile.ajaxEnabled){var h=m(f),e=k.makeUrlAbsolute(f.attr("href")||"#",h);if(e.search("#")!=-1)if(e=e.replace(/[^#]*#/,""))e=k.isPath(e)?k.makeUrlAbsolute(e,h):k.makeUrlAbsolute("#"+e,u.hrefNoHash);else{c.preventDefault();return}var h=f.is("[rel='external']")||f.is(":jqmData(ajax='false')")||f.is("[target]"),i=a.mobile.allowCrossDomainPages&&u.protocol==="file:"&&e.search(/^https?:/)!=-1,h=h||k.isExternal(e)&&!i;q=f.closest(".ui-btn");h?g():(g=f.jqmData("transition"),h=(h=f.jqmData("direction"))&&
h==="reverse"||f.jqmData("back"),f=f.attr("data-"+a.mobile.ns+"rel")||d,a.mobile.changePage(e,{transition:g,reverse:h,role:f}),c.preventDefault())}else g()}});o.bind("hashchange",function(){var b=k.stripHash(location.hash),c=a.mobile.urlHistory.stack.length===0?"none":d;if(!a.mobile.hashListeningEnabled||n.ignoreNextHashChange)n.ignoreNextHashChange=!1;else{if(n.stack.length>1&&b.indexOf(v)>-1)if(a.mobile.activePage.is(".ui-dialog")){var e=function(){b=a.mobile.urlHistory.getActive().page};n.directHashChange({currentUrl:b,
isBack:e,isForward:e})}else{n.directHashChange({currentUrl:b,isBack:function(){window.history.back()},isForward:function(){window.history.forward()}});return}b?(b=typeof b==="string"&&!k.isPath(b)?"#"+b:b,a.mobile.changePage(b,{transition:c,changeHash:!1,fromHashChange:!0})):a.mobile.changePage(a.mobile.firstPage,{transition:c,changeHash:!1,fromHashChange:!0})}});a(document).bind("pageshow",i);a(window).bind("throttledresize",i)})(jQuery);
(function(a){function d(c,b,d,f){var g=new a.Deferred,i=b?" reverse":"",h="ui-mobile-viewport-transitioning viewport-"+c;d.animationComplete(function(){d.add(f).removeClass("out in reverse "+c);f&&f.removeClass(a.mobile.activePageClass);d.parent().removeClass(h);g.resolve(c,b,d,f)});d.parent().addClass(h);f&&f.addClass(c+" out"+i);d.addClass(a.mobile.activePageClass+" "+c+" in"+i);return g.promise()}a.mobile.css3TransitionHandler=d;if(a.mobile.defaultTransitionHandler===a.mobile.noneTransitionHandler)a.mobile.defaultTransitionHandler=
d})(jQuery,this);
(function(a,d){a.fn.fixHeaderFooter=function(){if(!a.support.scrollTop)return this;return this.each(function(){var c=a(this);c.jqmData("fullscreen")&&c.addClass("ui-page-fullscreen");c.find(".ui-header:jqmData(position='fixed')").addClass("ui-header-fixed ui-fixed-inline fade");c.find(".ui-footer:jqmData(position='fixed')").addClass("ui-footer-fixed ui-fixed-inline fade")})};a.fixedToolbars=function(){function c(){!g&&f=="overlay"&&(i||a.fixedToolbars.hide(!0),a.fixedToolbars.startShowTimer())}function b(a){var b=
0;if(a)for(var c=a.offsetParent,d=document.body,b=a.offsetTop;a&&a!=d;){b+=a.scrollTop||0;if(a==c)b+=c.offsetTop,c=a.offsetParent;a=a.parentNode}return b}function e(c){var d=a(window).scrollTop(),e=b(c[0]),f=c.css("top")=="auto"?0:parseFloat(c.css("top")),g=window.innerHeight,h=c.outerHeight(),i=c.parents(".ui-page:not(.ui-page-fullscreen)").length;return c.is(".ui-header-fixed")?(f=d-e+f,f<e&&(f=0),c.css("top",i?f:d)):c.css("top",i?d+g-h-(e-f):d+g-h)}if(a.support.scrollTop){var f="inline",g=!1,i,
h,l=null,m=!1,o=!0;a(function(){a(document).bind("vmousedown",function(){o&&(l=f)}).bind("vclick",function(b){o&&!a(b.target).closest("a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed").length&&!m&&(a.fixedToolbars.toggle(l),l=null)}).bind("silentscroll",c);(a(document).scrollTop()==0?a(window):a(document)).bind("scrollstart",function(){m=!0;l==null&&(l=f);var b=l=="overlay";if(g=b||!!i)a.fixedToolbars.clearShowTimer(),b&&a.fixedToolbars.hide(!0)}).bind("scrollstop",function(b){a(b.target).closest("a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed").length||
(m=!1,g&&(g=!1,a.fixedToolbars.startShowTimer()),l=null)});a(window).bind("resize",c)});a(".ui-page").live("pagebeforeshow",function(b,c){var d=a(b.target).find(":jqmData(role='footer')"),f=d.data("id"),g=c.prevPage,g=g&&g.find(":jqmData(role='footer')"),g=g.length&&g.jqmData("id")===f;f&&g&&(h=d,e(h.removeClass("fade in out").appendTo(a.mobile.pageContainer)))});a(".ui-page").live("pageshow",function(){var b=a(this);h&&h.length&&setTimeout(function(){e(h.appendTo(b).addClass("fade"));h=null},500);
a.fixedToolbars.show(!0,this)});a(".ui-collapsible-contain").live("collapse expand",c);return{show:function(c,d){a.fixedToolbars.clearShowTimer();f="overlay";return(d?a(d):a.mobile.activePage?a.mobile.activePage:a(".ui-page-active")).children(".ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last").each(function(){var d=a(this),f=a(window).scrollTop(),g=b(d[0]),h=window.innerHeight,i=d.outerHeight(),f=d.is(".ui-header-fixed")&&f<=g+i||d.is(".ui-footer-fixed")&&g<=f+h;d.addClass("ui-fixed-overlay").removeClass("ui-fixed-inline");
!f&&!c&&d.animationComplete(function(){d.removeClass("in")}).addClass("in");e(d)})},hide:function(b){f="inline";return(a.mobile.activePage?a.mobile.activePage:a(".ui-page-active")).children(".ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last").each(function(){var c=a(this),d=c.css("top"),d=d=="auto"?0:parseFloat(d);c.addClass("ui-fixed-inline").removeClass("ui-fixed-overlay");if(d<0||c.is(".ui-header-fixed")&&d!=0)b?c.css("top",0):c.css("top")!=="auto"&&parseFloat(c.css("top"))!==
0&&c.animationComplete(function(){c.removeClass("out reverse");c.css("top",0)}).addClass("out reverse")})},startShowTimer:function(){a.fixedToolbars.clearShowTimer();var b=a.makeArray(arguments);i=setTimeout(function(){i=d;a.fixedToolbars.show.apply(null,b)},100)},clearShowTimer:function(){i&&clearTimeout(i);i=d},toggle:function(b){b&&(f=b);return f=="overlay"?a.fixedToolbars.hide():a.fixedToolbars.show()},setTouchToggleEnabled:function(a){o=a}}}}()})(jQuery);
(function(a,d){a.widget("mobile.checkboxradio",a.mobile.widget,{options:{theme:null},_create:function(){var c=this,b=this.element,e=b.closest("form,fieldset,:jqmData(role='page')").find("label").filter('[for="'+b[0].id+'"]'),f=b.attr("type"),g="ui-icon-"+f+"-off";if(!(f!="checkbox"&&f!="radio")){a.extend(this,{label:e,inputtype:f,checkedicon:"ui-icon-"+f+"-on",uncheckedicon:g});if(!this.options.theme)this.options.theme=this.element.jqmData("theme");e.buttonMarkup({theme:this.options.theme,icon:this.element.parents(":jqmData(type='horizontal')").length?
d:g,shadow:!1});b.add(e).wrapAll("<div class='ui-"+f+"'></div>");e.bind({vmouseover:function(){if(a(this).parent().is(".ui-disabled"))return!1},vclick:function(a){if(b.is(":disabled"))a.preventDefault();else return c._cacheVals(),b.prop("checked",f==="radio"&&!0||!b.prop("checked")),c._getInputSet().not(b).prop("checked",!1),c._updateAll(),!1}});b.bind({vmousedown:function(){this._cacheVals()},vclick:function(){a(this).is(":checked")?(a(this).prop("checked",!0),c._getInputSet().not(a(this)).prop("checked",
!1)):a(this).prop("checked",!1);c._updateAll()},focus:function(){e.addClass("ui-focus")},blur:function(){e.removeClass("ui-focus")}});this.refresh()}},_cacheVals:function(){this._getInputSet().each(function(){a(this).jqmData("cacheVal",a(this).is(":checked"))})},_getInputSet:function(){return this.element.closest("form,fieldset,:jqmData(role='page')").find("input[name='"+this.element.attr("name")+"'][type='"+this.inputtype+"']")},_updateAll:function(){var c=this;this._getInputSet().each(function(){(a(this).is(":checked")||
c.inputtype==="checkbox")&&a(this).trigger("change")}).checkboxradio("refresh")},refresh:function(){var c=this.element,b=this.label,d=b.find(".ui-icon");a(c[0]).prop("checked")?(b.addClass(a.mobile.activeBtnClass),d.addClass(this.checkedicon).removeClass(this.uncheckedicon)):(b.removeClass(a.mobile.activeBtnClass),d.removeClass(this.checkedicon).addClass(this.uncheckedicon));c.is(":disabled")?this.disable():this.enable()},disable:function(){this.element.prop("disabled",!0).parent().addClass("ui-disabled")},
enable:function(){this.element.prop("disabled",!1).parent().removeClass("ui-disabled")}})})(jQuery);
(function(a){a.widget("mobile.textinput",a.mobile.widget,{options:{theme:null},_create:function(){var h;var d=this.element,c=this.options,b=c.theme;b||(b=this.element.closest("[class*='ui-bar-'],[class*='ui-body-']"),h=(b=b.length&&/ui-(bar|body)-([a-z])/.exec(b.attr("class")))&&b[2]||"c",b=h);b=" ui-body-"+b;a('label[for="'+d.attr("id")+'"]').addClass("ui-input-text");d.addClass("ui-input-text ui-body-"+c.theme);var e=d;if(d.is("[type='search'],:jqmData(type='search')")){var e=d.wrap('<div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield'+
b+'"></div>').parent(),f=a('<a href="#" class="ui-input-clear" title="clear text">clear text</a>').tap(function(a){d.val("").focus();d.trigger("change");f.addClass("ui-input-clear-hidden");a.preventDefault()}).appendTo(e).buttonMarkup({icon:"delete",iconpos:"notext",corners:!0,shadow:!0}),c=function(){d.val()==""?f.addClass("ui-input-clear-hidden"):f.removeClass("ui-input-clear-hidden")};c();d.keyup(c);d.focus(c)}else d.addClass("ui-corner-all ui-shadow-inset"+b);d.focus(function(){e.addClass("ui-focus")}).blur(function(){e.removeClass("ui-focus")});
if(d.is("textarea")){var g=function(){var a=d[0].scrollHeight;d[0].clientHeight<a&&d.css({height:a+15})},i;d.keyup(function(){clearTimeout(i);i=setTimeout(g,100)})}},disable:function(){(this.element.attr("disabled",!0).is("[type='search'],:jqmData(type='search')")?this.element.parent():this.element).addClass("ui-disabled")},enable:function(){(this.element.attr("disabled",!1).is("[type='search'],:jqmData(type='search')")?this.element.parent():this.element).removeClass("ui-disabled")}})})(jQuery);
(function(a){a.widget("mobile.selectmenu",a.mobile.widget,{options:{theme:null,disabled:!1,icon:"arrow-d",iconpos:"right",inline:null,corners:!0,shadow:!0,iconshadow:!0,menuPageTheme:"b",overlayTheme:"a",hidePlaceholderMenuItems:!0,closeText:"Close",nativeMenu:!0},_create:function(){var d=this,c=this.options,b=this.element.wrap("<div class='ui-select'>"),e=b.attr("id"),f=a('label[for="'+e+'"]').addClass("ui-select"),g=b[0].selectedIndex==-1?0:b[0].selectedIndex,i=(d.options.nativeMenu?a("<div/>"):
a("<a>",{href:"#",role:"button",id:m,"aria-haspopup":"true","aria-owns":o})).text(a(b[0].options.item(g)).text()).insertBefore(b).buttonMarkup({theme:c.theme,icon:c.icon,iconpos:c.iconpos,inline:c.inline,corners:c.corners,shadow:c.shadow,iconshadow:c.iconshadow}),h=d.isMultiple=b[0].multiple;c.nativeMenu&&window.opera&&window.opera.version&&b.addClass("ui-select-nativeonly");if(!c.nativeMenu){var l=b.find("option"),m=e+"-button",o=e+"-menu",j=b.closest(".ui-page"),g=/ui-btn-up-([a-z])/.exec(i.attr("class"))[1],
p=a("<div data-"+a.mobile.ns+"role='dialog' data-"+a.mobile.ns+"theme='"+c.menuPageTheme+"'><div data-"+a.mobile.ns+"role='header'><div class='ui-title'>"+f.text()+"</div></div><div data-"+a.mobile.ns+"role='content'></div></div>").appendTo(a.mobile.pageContainer).page(),k=p.find(".ui-content");p.find(".ui-header a");var q=a("<div>",{"class":"ui-selectmenu-screen ui-screen-hidden"}).appendTo(j),n=a("<div>",{"class":"ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all pop ui-body-"+
c.overlayTheme}).insertAfter(q),z=a("<ul>",{"class":"ui-selectmenu-list",id:o,role:"listbox","aria-labelledby":m}).attr("data-"+a.mobile.ns+"theme",g).appendTo(n),y=a("<div>",{"class":"ui-header ui-bar-"+g}).prependTo(n),t=a("<h1>",{"class":"ui-title"}).appendTo(y),v=a("<a>",{text:c.closeText,href:"#","class":"ui-btn-left"}).attr("data-"+a.mobile.ns+"iconpos","notext").attr("data-"+a.mobile.ns+"icon","delete").appendTo(y).buttonMarkup()}if(h)d.buttonCount=a("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(i);
c.disabled&&this.disable();b.change(function(){d.refresh()});a.extend(d,{select:b,optionElems:l,selectID:e,label:f,buttonId:m,menuId:o,thisPage:j,button:i,menuPage:p,menuPageContent:k,screen:q,listbox:n,list:z,menuType:void 0,header:y,headerClose:v,headerTitle:t,placeholder:""});c.nativeMenu?b.appendTo(i).bind("vmousedown",function(){i.addClass(a.mobile.activeBtnClass)}).bind("focus vmouseover",function(){i.trigger("vmouseover")}).bind("vmousemove",function(){i.removeClass(a.mobile.activeBtnClass)}).bind("change blur vmouseout",
function(){i.trigger("vmouseout").removeClass(a.mobile.activeBtnClass)}):(d.refresh(),b.attr("tabindex","-1").focus(function(){a(this).blur();i.focus()}),i.bind("vclick keydown",function(b){if(b.type=="vclick"||b.keyCode&&(b.keyCode===a.mobile.keyCode.ENTER||b.keyCode===a.mobile.keyCode.SPACE))d.open(),b.preventDefault()}),z.attr("role","listbox").delegate(".ui-li>a","focusin",function(){a(this).attr("tabindex","0")}).delegate(".ui-li>a","focusout",function(){a(this).attr("tabindex","-1")}).delegate("li:not(.ui-disabled, .ui-li-divider)",
"vclick",function(c){var e=b[0].selectedIndex,f=z.find("li:not(.ui-li-divider)").index(this),g=d.optionElems.eq(f)[0];g.selected=h?!g.selected:!0;h&&a(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on",g.selected).toggleClass("ui-icon-checkbox-off",!g.selected);(h||e!==f)&&b.trigger("change");h||d.close();c.preventDefault()}).keydown(function(b){var c=a(b.target),d=c.closest("li");switch(b.keyCode){case 38:return b=d.prev(),b.length&&(c.blur().attr("tabindex","-1"),b.find("a").first().focus()),
!1;case 40:return b=d.next(),b.length&&(c.blur().attr("tabindex","-1"),b.find("a").first().focus()),!1;case 13:case 32:return c.trigger("vclick"),!1}}),q.bind("vclick",function(){d.close()}),d.headerClose.click(function(){if(d.menuType=="overlay")return d.close(),!1}))},_buildList:function(){var d=this,c=this.options,b=this.placeholder,e=[],f=[],g=d.isMultiple?"checkbox-off":"false";d.list.empty().filter(".ui-listview").listview("destroy");d.select.find("option").each(function(){var i=a(this),h=i.parent(),
l=i.text(),m="<a href='#'>"+l+"</a>",o=[],j=[];h.is("optgroup")&&(h=h.attr("label"),a.inArray(h,e)===-1&&(f.push("<li data-"+a.mobile.ns+"role='list-divider'>"+h+"</li>"),e.push(h)));if(!this.getAttribute("value")||l.length==0||i.jqmData("placeholder"))c.hidePlaceholderMenuItems&&o.push("ui-selectmenu-placeholder"),b=d.placeholder=l;this.disabled&&(o.push("ui-disabled"),j.push("aria-disabled='true'"));f.push("<li data-"+a.mobile.ns+"icon='"+g+"' class='"+o.join(" ")+"' "+j.join(" ")+">"+m+"</li>")});
d.list.html(f.join(" "));d.list.find("li").attr({role:"option",tabindex:"-1"}).first().attr("tabindex","0");this.isMultiple||this.headerClose.hide();!this.isMultiple&&!b.length?this.header.hide():this.headerTitle.text(this.placeholder);d.list.listview()},refresh:function(d){var c=this,b=this.element,e=this.isMultiple,f=this.optionElems=b.find("option"),g=f.filter(":selected"),i=g.map(function(){return f.index(this)}).get();!c.options.nativeMenu&&(d||b[0].options.length!=c.list.find("li").length)&&
c._buildList();c.button.find(".ui-btn-text").text(function(){if(!e)return g.text();return g.length?g.map(function(){return a(this).text()}).get().join(", "):c.placeholder});e&&c.buttonCount[g.length>1?"show":"hide"]().text(g.length);c.options.nativeMenu||c.list.find("li:not(.ui-li-divider)").removeClass(a.mobile.activeBtnClass).attr("aria-selected",!1).each(function(b){a.inArray(b,i)>-1&&(b=a(this).addClass(a.mobile.activeBtnClass),b.find("a").attr("aria-selected",!0),e&&b.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on"))})},
open:function(){function d(){c.list.find(".ui-btn-active").focus()}if(!this.options.disabled&&!this.options.nativeMenu){var c=this,b=c.list.parent().outerHeight(),e=c.list.parent().outerWidth(),f=a(window).scrollTop(),g=c.button.offset().top,i=window.innerHeight,h=window.innerWidth;c.button.addClass(a.mobile.activeBtnClass);setTimeout(function(){c.button.removeClass(a.mobile.activeBtnClass)},300);if(b>i-80||!a.support.scrollTop){if(f==0&&g>i)c.thisPage.one("pagehide",function(){a(this).jqmData("lastScroll",
g)});c.menuPage.one("pageshow",function(){a(window).one("silentscroll",function(){d()})});c.menuType="page";c.menuPageContent.append(c.list);a.mobile.changePage(c.menuPage,{transition:"pop"})}else{c.menuType="overlay";c.screen.height(a(document).height()).removeClass("ui-screen-hidden");var l=g-f,m=f+i-g,o=b/2,j=parseFloat(c.list.parent().css("max-width")),b=l>b/2&&m>b/2?g+c.button.outerHeight()/2-o:l>m?f+i-b-30:f+30;e<j?j=(h-e)/2:(j=c.button.offset().left+c.button.outerWidth()/2-e/2,j<30?j=30:j+
e>h&&(j=h-e-30));c.listbox.append(c.list).removeClass("ui-selectmenu-hidden").css({top:b,left:j}).addClass("in");d()}setTimeout(function(){c.isOpen=!0},400)}},close:function(){function a(){setTimeout(function(){c.button.focus()},40);c.listbox.removeAttr("style").append(c.list)}if(!this.options.disabled&&this.isOpen&&!this.options.nativeMenu){var c=this;c.menuType=="page"?(c.menuPage.one("pagehide",a),window.history.back()):(c.screen.addClass("ui-screen-hidden"),c.listbox.addClass("ui-selectmenu-hidden").removeAttr("style").removeClass("in"),
a());this.isOpen=!1}},disable:function(){this.element.attr("disabled",!0);this.button.addClass("ui-disabled").attr("aria-disabled",!0);return this._setOption("disabled",!0)},enable:function(){this.element.attr("disabled",!1);this.button.removeClass("ui-disabled").attr("aria-disabled",!1);return this._setOption("disabled",!1)}})})(jQuery);
(function(a){function d(b){for(;b;){var c=a(b);if(c.hasClass("ui-btn")&&!c.hasClass("ui-disabled"))break;b=b.parentNode}return b}a.fn.buttonMarkup=function(b){return this.each(function(){var d=a(this),f=a.extend({},a.fn.buttonMarkup.defaults,d.jqmData(),b),g,i="ui-btn-inner",h;c&&c();if(!f.theme)g=d.closest("[class*='ui-bar-'],[class*='ui-body-']"),f.theme=g.length?/ui-(bar|body)-([a-z])/.exec(g.attr("class"))[2]:"c";g="ui-btn ui-btn-up-"+f.theme;f.inline&&(g+=" ui-btn-inline");if(f.icon)f.icon="ui-icon-"+
f.icon,f.iconpos=f.iconpos||"left",h="ui-icon "+f.icon,f.shadow&&(h+=" ui-icon-shadow");f.iconpos&&(g+=" ui-btn-icon-"+f.iconpos,f.iconpos=="notext"&&!d.attr("title")&&d.attr("title",d.text()));f.corners&&(g+=" ui-btn-corner-all",i+=" ui-btn-corner-all");f.shadow&&(g+=" ui-shadow");d.attr("data-"+a.mobile.ns+"theme",f.theme).addClass(g);f=("<D class='"+i+"'><D class='ui-btn-text'></D>"+(f.icon?"<span class='"+h+"'></span>":"")+"</D>").replace(/D/g,f.wrapperEls);d.wrapInner(f)})};a.fn.buttonMarkup.defaults=
{corners:!0,shadow:!0,iconshadow:!0,wrapperEls:"span"};var c=function(){a(document).bind({vmousedown:function(b){if(b=d(b.target)){var b=a(b),c=b.attr("data-"+a.mobile.ns+"theme");b.removeClass("ui-btn-up-"+c).addClass("ui-btn-down-"+c)}},"vmousecancel vmouseup":function(b){if(b=d(b.target)){var b=a(b),c=b.attr("data-"+a.mobile.ns+"theme");b.removeClass("ui-btn-down-"+c).addClass("ui-btn-up-"+c)}},"vmouseover focus":function(b){if(b=d(b.target)){var b=a(b),c=b.attr("data-"+a.mobile.ns+"theme");b.removeClass("ui-btn-up-"+
c).addClass("ui-btn-hover-"+c)}},"vmouseout blur":function(b){if(b=d(b.target)){var b=a(b),c=b.attr("data-"+a.mobile.ns+"theme");b.removeClass("ui-btn-hover-"+c).addClass("ui-btn-up-"+c)}}});c=null}})(jQuery);
(function(a){a.widget("mobile.button",a.mobile.widget,{options:{theme:null,icon:null,iconpos:null,inline:null,corners:!0,shadow:!0,iconshadow:!0},_create:function(){var d=this.element,c=this.options;this.button=a("<div></div>").text(d.text()||d.val()).buttonMarkup({theme:c.theme,icon:c.icon,iconpos:c.iconpos,inline:c.inline,corners:c.corners,shadow:c.shadow,iconshadow:c.iconshadow}).insertBefore(d).append(d.addClass("ui-btn-hidden"));c=d.attr("type");c!=="button"&&c!=="reset"&&d.bind("vclick",function(){var b=
a("<input>",{type:"hidden",name:d.attr("name"),value:d.attr("value")}).insertBefore(d);a(document).submit(function(){b.remove()})});this.refresh()},enable:function(){this.element.attr("disabled",!1);this.button.removeClass("ui-disabled").attr("aria-disabled",!1);return this._setOption("disabled",!1)},disable:function(){this.element.attr("disabled",!0);this.button.addClass("ui-disabled").attr("aria-disabled",!0);return this._setOption("disabled",!0)},refresh:function(){this.element.attr("disabled")?
this.disable():this.enable()}})})(jQuery);
(function(a){a.widget("mobile.slider",a.mobile.widget,{options:{theme:null,trackTheme:null,disabled:!1},_create:function(){var d=this,c=this.element,b=c.parents("[class*=ui-bar-],[class*=ui-body-]").eq(0),b=b.length?b.attr("class").match(/ui-(bar|body)-([a-z])/)[2]:"c",e=this.options.theme?this.options.theme:b,f=this.options.trackTheme?this.options.trackTheme:b,g=c[0].nodeName.toLowerCase(),b=g=="select"?"ui-slider-switch":"",i=c.attr("id"),h=i+"-label",i=a('[for="'+i+'"]').attr("id",h),l=function(){return g==
"input"?parseFloat(c.val()):c[0].selectedIndex},m=g=="input"?parseFloat(c.attr("min")):0,o=g=="input"?parseFloat(c.attr("max")):c.find("option").length-1,j=window.parseFloat(c.attr("step")||1),p=a('<div class="ui-slider '+b+" ui-btn-down-"+f+' ui-btn-corner-all" role="application"></div>'),k=a('<a href="#" class="ui-slider-handle"></a>').appendTo(p).buttonMarkup({corners:!0,theme:e,shadow:!0}).attr({role:"slider","aria-valuemin":m,"aria-valuemax":o,"aria-valuenow":l(),"aria-valuetext":l(),title:l(),
"aria-labelledby":h});a.extend(this,{slider:p,handle:k,dragging:!1,beforeStart:null});g=="select"&&(p.wrapInner('<div class="ui-slider-inneroffset"></div>'),c.find("option"),c.find("option").each(function(b){var c=b==0?"b":"a",d=b==0?"right":"left",b=b==0?" ui-btn-down-"+f:" ui-btn-active";a('<div class="ui-slider-labelbg ui-slider-labelbg-'+c+b+" ui-btn-corner-"+d+'"></div>').prependTo(p);a('<span class="ui-slider-label ui-slider-label-'+c+b+" ui-btn-corner-"+d+'" role="img">'+a(this).text()+"</span>").prependTo(k)}));
i.addClass("ui-slider");c.addClass(g=="input"?"ui-slider-input":"ui-slider-switch").change(function(){d.refresh(l(),!0)}).keyup(function(){d.refresh(l(),!0,!0)}).blur(function(){d.refresh(l(),!0)});a(document).bind("vmousemove",function(a){if(d.dragging)return d.refresh(a),!1});p.bind("vmousedown",function(a){d.dragging=!0;if(g==="select")d.beforeStart=c[0].selectedIndex;d.refresh(a);return!1});p.add(document).bind("vmouseup",function(){if(d.dragging){d.dragging=!1;if(g==="select"){d.beforeStart===
c[0].selectedIndex&&d.refresh(d.beforeStart===0?1:0);var a=l(),a=Math.round(a/(o-m)*100);k.addClass("ui-slider-handle-snapping").css("left",a+"%").animationComplete(function(){k.removeClass("ui-slider-handle-snapping")})}return!1}});p.insertAfter(c);this.handle.bind("vmousedown",function(){a(this).focus()}).bind("vclick",!1);this.handle.bind("keydown",function(b){var c=l();if(!d.options.disabled){switch(b.keyCode){case a.mobile.keyCode.HOME:case a.mobile.keyCode.END:case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:if(b.preventDefault(),
!d._keySliding)d._keySliding=!0,a(this).addClass("ui-state-active")}switch(b.keyCode){case a.mobile.keyCode.HOME:d.refresh(m);break;case a.mobile.keyCode.END:d.refresh(o);break;case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:d.refresh(c+j);break;case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:d.refresh(c-j)}}}).keyup(function(){if(d._keySliding)d._keySliding=!1,a(this).removeClass("ui-state-active")});this.refresh()},refresh:function(a,
c,b){if(!this.options.disabled){var e=this.element,f=e[0].nodeName.toLowerCase(),g=f==="input"?parseFloat(e.attr("min")):0,i=f==="input"?parseFloat(e.attr("max")):e.find("option").length-1;if(typeof a==="object"){if(!this.dragging||a.pageX<this.slider.offset().left-8||a.pageX>this.slider.offset().left+this.slider.width()+8)return;a=Math.round((a.pageX-this.slider.offset().left)/this.slider.width()*100)}else a==null&&(a=f==="input"?parseFloat(e.val()):e[0].selectedIndex),a=(parseFloat(a)-g)/(i-g)*
100;if(!isNaN(a)){a<0&&(a=0);a>100&&(a=100);var h=Math.round(a/100*(i-g))+g;h<g&&(h=g);h>i&&(h=i);this.handle.css("left",a+"%");this.handle.attr({"aria-valuenow":f==="input"?h:e.find("option").eq(h).attr("value"),"aria-valuetext":f==="input"?h:e.find("option").eq(h).text(),title:h});f==="select"&&(h===0?this.slider.addClass("ui-slider-switch-a").removeClass("ui-slider-switch-b"):this.slider.addClass("ui-slider-switch-b").removeClass("ui-slider-switch-a"));if(!b)f==="input"?e.val(h):e[0].selectedIndex=
h,c||e.trigger("change")}}},enable:function(){this.element.attr("disabled",!1);this.slider.removeClass("ui-disabled").attr("aria-disabled",!1);return this._setOption("disabled",!1)},disable:function(){this.element.attr("disabled",!0);this.slider.addClass("ui-disabled").attr("aria-disabled",!0);return this._setOption("disabled",!0)}})})(jQuery);
(function(a){a.widget("mobile.collapsible",a.mobile.widget,{options:{expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsed:!1,heading:">:header,>legend",theme:null,iconTheme:"d"},_create:function(){var d=this.element,c=this.options,b=d.addClass("ui-collapsible-contain"),e=d.find(c.heading).eq(0),f=b.wrapInner('<div class="ui-collapsible-content"></div>').find(".ui-collapsible-content"),d=d.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set");
e.is("legend")&&(e=a('<div role="heading">'+e.html()+"</div>").insertBefore(e),e.next().remove());e.insertBefore(f).addClass("ui-collapsible-heading").append('<span class="ui-collapsible-heading-status"></span>').wrapInner('<a href="#" class="ui-collapsible-heading-toggle"></a>').find("a:eq(0)").buttonMarkup({shadow:!d.length,corners:!1,iconPos:"left",icon:"plus",theme:c.theme}).find(".ui-icon").removeAttr("class").buttonMarkup({shadow:!0,corners:!0,iconPos:"notext",icon:"plus",theme:c.iconTheme});
d.length?b.jqmData("collapsible-last")&&e.find("a:eq(0), .ui-btn-inner").addClass("ui-corner-bottom"):e.find("a:eq(0)").addClass("ui-corner-all").find(".ui-btn-inner").addClass("ui-corner-all");b.bind("collapse",function(d){!d.isDefaultPrevented()&&a(d.target).closest(".ui-collapsible-contain").is(b)&&(d.preventDefault(),e.addClass("ui-collapsible-heading-collapsed").find(".ui-collapsible-heading-status").text(c.expandCueText).end().find(".ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-plus"),
f.addClass("ui-collapsible-content-collapsed").attr("aria-hidden",!0),b.jqmData("collapsible-last")&&e.find("a:eq(0), .ui-btn-inner").addClass("ui-corner-bottom"))}).bind("expand",function(a){a.isDefaultPrevented()||(a.preventDefault(),e.removeClass("ui-collapsible-heading-collapsed").find(".ui-collapsible-heading-status").text(c.collapseCueText),e.find(".ui-icon").removeClass("ui-icon-plus").addClass("ui-icon-minus"),f.removeClass("ui-collapsible-content-collapsed").attr("aria-hidden",!1),b.jqmData("collapsible-last")&&
e.find("a:eq(0), .ui-btn-inner").removeClass("ui-corner-bottom"))}).trigger(c.collapsed?"collapse":"expand");d.length&&!d.jqmData("collapsiblebound")&&(d.jqmData("collapsiblebound",!0).bind("expand",function(b){a(b.target).closest(".ui-collapsible-contain").siblings(".ui-collapsible-contain").trigger("collapse")}),d=d.find(":jqmData(role='collapsible'):first"),d.first().find("a:eq(0)").addClass("ui-corner-top").find(".ui-btn-inner").addClass("ui-corner-top"),d.last().jqmData("collapsible-last",!0));
e.bind("vclick",function(a){e.is(".ui-collapsible-heading-collapsed")?b.trigger("expand"):b.trigger("collapse");a.preventDefault()})}})})(jQuery);
(function(a){a.fn.controlgroup=function(d){return this.each(function(){function c(a){a.removeClass("ui-btn-corner-all ui-shadow").eq(0).addClass(f[0]).end().filter(":last").addClass(f[1]).addClass("ui-controlgroup-last")}var b=a.extend({direction:a(this).jqmData("type")||"vertical",shadow:!1},d),e=a(this).find(">legend"),f=b.direction=="horizontal"?["ui-corner-left","ui-corner-right"]:["ui-corner-top","ui-corner-bottom"];a(this).find("input:eq(0)").attr("type");e.length&&(a(this).wrapInner('<div class="ui-controlgroup-controls"></div>'),
a('<div role="heading" class="ui-controlgroup-label">'+e.html()+"</div>").insertBefore(a(this).children(0)),e.remove());a(this).addClass("ui-corner-all ui-controlgroup ui-controlgroup-"+b.direction);c(a(this).find(".ui-btn"));c(a(this).find(".ui-btn-inner"));b.shadow&&a(this).addClass("ui-shadow")})}})(jQuery);(function(a){a.fn.fieldcontain=function(){return this.addClass("ui-field-contain ui-body ui-br")}})(jQuery);
(function(a){var d={};a.widget("mobile.listview",a.mobile.widget,{options:{theme:"c",countTheme:"c",headerTheme:"b",dividerTheme:"b",splitIcon:"arrow-r",splitTheme:"b",inset:!1},_create:function(){var a=this;a.element.addClass(function(b,d){return d+" ui-listview "+(a.options.inset?" ui-listview-inset ui-corner-all ui-shadow ":"")});a.refresh()},_itemApply:function(c,b){b.find(".ui-li-count").addClass("ui-btn-up-"+(c.jqmData("counttheme")||this.options.countTheme)+" ui-btn-corner-all").end().find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(">img:eq(0), .ui-link-inherit>img:eq(0)").addClass("ui-li-thumb").each(function(){b.addClass(a(this).is(".ui-li-icon")?
"ui-li-has-icon":"ui-li-has-thumb")}).end().find(".ui-li-aside").each(function(){var b=a(this);b.prependTo(b.parent())})},_removeCorners:function(a){a.add(a.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb")).removeClass("ui-corner-top ui-corner-bottom ui-corner-br ui-corner-bl ui-corner-tr ui-corner-tl")},refresh:function(c){this._createSubPages();var b=this.options,d=this.element,f=d.jqmData("dividertheme")||b.dividerTheme,g=d.jqmData("splittheme"),i=d.jqmData("spliticon"),h=d.children("li"),
l=a.support.cssPseudoElement||!a.nodeName(d[0],"ol")?0:1;l&&d.find(".ui-li-dec").remove();for(var m=0,o=h.length;m<o;m++){var j=h.eq(m),p="ui-li";if(c||!j.hasClass("ui-li")){var k=j.jqmData("theme")||b.theme,q=j.children("a");if(q.length){var n=j.jqmData("icon");j.buttonMarkup({wrapperEls:"div",shadow:!1,corners:!1,iconpos:"right",icon:q.length>1||n===!1?!1:n||"arrow-r",theme:k});q.first().addClass("ui-link-inherit");q.length>1&&(p+=" ui-li-has-alt",q=q.last(),n=g||q.jqmData("theme")||b.splitTheme,
q.appendTo(j).attr("title",q.text()).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1,corners:!1,theme:k,icon:!1,iconpos:!1}).find(".ui-btn-inner").append(a("<span />").buttonMarkup({shadow:!0,corners:!0,theme:n,iconpos:"notext",icon:i||q.jqmData("icon")||b.splitIcon})))}else j.jqmData("role")==="list-divider"?(p+=" ui-li-divider ui-btn ui-bar-"+f,j.attr("role","heading"),l&&(l=1)):p+=" ui-li-static ui-body-"+k}b.inset&&(m===0&&(p+=" ui-corner-top",j.add(j.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-tr").end().find(".ui-li-thumb").addClass("ui-corner-tl"),
j.next().next().length&&this._removeCorners(j.next())),m===h.length-1&&(p+=" ui-corner-bottom",j.add(j.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-br").end().find(".ui-li-thumb").addClass("ui-corner-bl"),j.prev().prev().length&&this._removeCorners(j.prev())));l&&p.indexOf("ui-li-divider")<0&&(j.is(".ui-li-static:first")?j:j.find(".ui-link-inherit")).addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>"+l++ +". </span>");j.add(j.children(".ui-btn-inner")).addClass(p);
c||this._itemApply(d,j)}},_idStringEscape:function(a){return a.replace(/[^a-zA-Z0-9]/g,"-")},_createSubPages:function(){var c=this.element,b=c.closest(".ui-page"),e=b.jqmData("url"),f=e||b[0][a.expando],g=c.attr("id"),i=this.options,h="data-"+a.mobile.ns,l=b.find(":jqmData(role='footer')").jqmData("id");typeof d[f]==="undefined"&&(d[f]=-1);g=g||++d[f];a(c.find("li>ul, li>ol").toArray().reverse()).each(function(b){var d=a(this),f=d.attr("id")||g+"-"+b,b=d.parent(),p=a(d.prevAll().toArray().reverse()),
p=p.length?p:a("<span>"+a.trim(b.contents()[0].nodeValue)+"</span>"),k=p.first().text(),f=(e||"")+"&"+a.mobile.subPageUrlKey+"="+f;theme=d.jqmData("theme")||i.theme;countTheme=d.jqmData("counttheme")||c.jqmData("counttheme")||i.countTheme;newPage=d.detach().wrap("<div "+h+"role='page' "+h+"url='"+f+"' "+h+"theme='"+theme+"' "+h+"count-theme='"+countTheme+"'><div "+h+"role='content'></div></div>").parent().before("<div "+h+"role='header' "+h+"theme='"+i.headerTheme+"'><div class='ui-title'>"+k+"</div></div>").after(l?
a("<div "+h+"role='footer' "+h+"id='"+l+"'>"):"").parent().appendTo(a.mobile.pageContainer);newPage.page();d=b.find("a:first");d.length||(d=a("<a />").html(p||k).prependTo(b.empty()));d.attr("href","#"+f)}).listview()}})})(jQuery);
(function(a){a.mobile.listview.prototype.options.filter=!1;a.mobile.listview.prototype.options.filterPlaceholder="Filter items...";a.mobile.listview.prototype.options.filterTheme="c";a(":jqmData(role='listview')").live("listviewcreate",function(){var d=a(this),c=d.data("listview");if(c.options.filter){var b=a("<form>",{"class":"ui-listview-filter ui-bar-"+c.options.filterTheme,role:"search"});a("<input>",{placeholder:c.options.filterPlaceholder}).attr("data-"+a.mobile.ns+"type","search").jqmData("lastval",
"").bind("keyup change",function(){var b=this.value.toLowerCase(),c=null,c=a(this).jqmData("lastval")+"";a(this).jqmData("lastval",b);change=b.replace(RegExp("^"+c),"");c=b.length<c.length||change.length!=b.length-c.length?d.children():d.children(":not(.ui-screen-hidden)");if(b){for(var g,i=!1,h="",l=c.length-1;l>=0;l--)g=a(c[l]),h=g.jqmData("filtertext")||g.text(),g.is("li:jqmData(role=list-divider)")?(g.toggleClass("ui-filter-hidequeue",!i),i=!1):h.toLowerCase().indexOf(b)===-1?g.toggleClass("ui-filter-hidequeue",
!0):i=!0;c.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden",!1);c.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden",!0).toggleClass("ui-filter-hidequeue",!1)}else c.toggleClass("ui-screen-hidden",!1)}).appendTo(b).textinput();a(this).jqmData("inset")&&b.addClass("ui-listview-filter-inset");b.insertBefore(d)}})})(jQuery);
(function(a){a.widget("mobile.dialog",a.mobile.widget,{options:{closeBtnText:"Close"},_create:function(){var d=this.element;d.attr("role","dialog").addClass("ui-page ui-dialog ui-body-a").find(":jqmData(role=header)").addClass("ui-corner-top ui-overlay-shadow").prepend("<a href='#' data-"+a.mobile.ns+"icon='delete' data-"+a.mobile.ns+"rel='back' data-"+a.mobile.ns+"iconpos='notext'>"+this.options.closeBtnText+"</a>").end().find('.ui-content:not([class*="ui-body-"])').addClass("ui-body-c").end().find(".ui-content,:jqmData(role='footer')").last().addClass("ui-corner-bottom ui-overlay-shadow");
d.bind("vclick submit",function(c){c=a(c.target).closest(c.type==="vclick"?"a":"form");if(c.length&&!c.jqmData("transition")){var b=a.mobile.urlHistory.getActive()||{};c.attr("data-"+a.mobile.ns+"transition",b.transition||a.mobile.defaultDialogTransition).attr("data-"+a.mobile.ns+"direction","reverse")}}).bind("pagehide",function(){a(this).find("."+a.mobile.activeBtnClass).removeClass(a.mobile.activeBtnClass)})},close:function(){window.history.back()}})})(jQuery);
(function(a,d){a.widget("mobile.navbar",a.mobile.widget,{options:{iconpos:"top",grid:null},_create:function(){var c=this.element,b=c.find("a"),e=b.filter(":jqmData(icon)").length?this.options.iconpos:d;c.addClass("ui-navbar").attr("role","navigation").find("ul").grid({grid:this.options.grid});e||c.addClass("ui-navbar-noicons");b.buttonMarkup({corners:!1,shadow:!1,iconpos:e});c.delegate("a","vclick",function(){b.not(".ui-state-persist").removeClass(a.mobile.activeBtnClass);a(this).addClass(a.mobile.activeBtnClass)})}})})(jQuery);
(function(a){a.fn.grid=function(d){return this.each(function(){var c=a.extend({grid:null},d),b=a(this).children(),e={solo:1,a:2,b:3,c:4,d:5},c=c.grid;if(!c)if(b.length<=5)for(var f in e)e[f]==b.length&&(c=f);else c="a";e=e[c];a(this).addClass("ui-grid-"+c);b.filter(":nth-child("+e+"n+1)").addClass("ui-block-a");e>1&&b.filter(":nth-child("+e+"n+2)").addClass("ui-block-b");e>2&&b.filter(":nth-child(3n+3)").addClass("ui-block-c");e>3&&b.filter(":nth-child(4n+4)").addClass("ui-block-d");e>4&&b.filter(":nth-child(5n+5)").addClass("ui-block-e")})}})(jQuery);
(function(a,d,c){var b=a("html");a("head");var e=a(d);a(d.document).trigger("mobileinit");if(a.mobile.gradeA()){if(d.blackberry&&!d.WebKitPoint||d.operamini&&Object.prototype.toString.call(d.operamini)==="[object OperaMini]")a.mobile.ajaxEnabled=!1;b.addClass("ui-mobile ui-mobile-rendering");var f=a.mobile.loadingMessage?a("<div class='ui-loader ui-body-a ui-corner-all'><span class='ui-icon ui-icon-loading spin'></span><h1>"+a.mobile.loadingMessage+"</h1></div>"):c;a.extend(a.mobile,{showPageLoadingMsg:function(){if(a.mobile.loadingMessage){var c=
a("."+a.mobile.activeBtnClass).first();f.appendTo(a.mobile.pageContainer).css({top:a.support.scrollTop&&a(d).scrollTop()+a(d).height()/2||c.length&&c.offset().top||100})}b.addClass("ui-loading")},hidePageLoadingMsg:function(){b.removeClass("ui-loading")},pageLoading:function(b){b?a.mobile.hidePageLoadingMsg():a.mobile.showPageLoadingMsg()},initializePage:function(){var b=a(":jqmData(role='page')");b.add(":jqmData(role='dialog')").each(function(){var b=a(this);b.jqmData("url")||b.attr("data-"+a.mobile.ns+
"url",b.attr("id"))});a.mobile.firstPage=b.first();a.mobile.pageContainer=b.first().parent().addClass("ui-mobile-viewport");a.mobile.showPageLoadingMsg();!a.mobile.hashListeningEnabled||!a.mobile.path.stripHash(location.hash)?a.mobile.changePage(a.mobile.firstPage,{transition:"none",reverse:!0,changeHash:!1,fromHashChange:!0}):e.trigger("hashchange",[!0])}});a(function(){d.scrollTo(0,1);a.mobile.defaultHomeScroll=!a.support.scrollTop||a(d).scrollTop()===1?0:1;a(a.mobile.initializePage);e.load(a.mobile.silentScroll)})}})(jQuery,
this);
/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( jQuery, undefined ){
	var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

	function newTmplItem( options, parentItem, fn, data ) {
		// Returns a template item data structure for a new rendered instance of a template (a 'template item').
		// The content field is a hierarchical array of strings and nested items (to be
		// removed and replaced by nodes field of dom elements, once inserted in DOM).
		var newItem = {
			data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
			_wrap: parentItem ? parentItem._wrap : null,
			tmpl: null,
			parent: parentItem || null,
			nodes: [],
			calls: tiCalls,
			nest: tiNest,
			wrap: tiWrap,
			html: tiHtml,
			update: tiUpdate
		};
		if ( options ) {
			jQuery.extend( newItem, options, { nodes: [], parent: parentItem });
		}
		if ( fn ) {
			// Build the hierarchical content to be used during insertion into DOM
			newItem.tmpl = fn;
			newItem._ctnt = newItem._ctnt || newItem.tmpl( jQuery, newItem );
			newItem.key = ++itemKey;
			// Keep track of new template item, until it is stored as jQuery Data on DOM element
			(stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
		}
		return newItem;
	}

	// Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var ret = [], insert = jQuery( selector ), elems, i, l, tmplItems,
				parent = this.length === 1 && this[0].parentNode;

			appendToTmplItems = newTmplItems || {};
			if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
				insert[ original ]( this[0] );
				ret = this;
			} else {
				for ( i = 0, l = insert.length; i < l; i++ ) {
					cloneIndex = i;
					elems = (i > 0 ? this.clone(true) : this).get();
					jQuery( insert[i] )[ original ]( elems );
					ret = ret.concat( elems );
				}
				cloneIndex = 0;
				ret = this.pushStack( ret, name, insert.selector );
			}
			tmplItems = appendToTmplItems;
			appendToTmplItems = null;
			jQuery.tmpl.complete( tmplItems );
			return ret;
		};
	});

	jQuery.fn.extend({
		// Use first wrapped element as template markup.
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( data, options, parentItem ) {
			return jQuery.tmpl( this[0], data, options, parentItem );
		},

		// Find which rendered template item the first wrapped DOM element belongs to
		tmplItem: function() {
			return jQuery.tmplItem( this[0] );
		},

		// Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
		template: function( name ) {
			return jQuery.template( name, this[0] );
		},

		domManip: function( args, table, callback, options ) {
			if ( args[0] && jQuery.isArray( args[0] )) {
				var dmArgs = jQuery.makeArray( arguments ), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
				while ( i < elemsLength && !(tmplItem = jQuery.data( elems[i++], "tmplItem" ))) {}
				if ( tmplItem && cloneIndex ) {
					dmArgs[2] = function( fragClone ) {
						// Handler called by oldManip when rendered template has been inserted into DOM.
						jQuery.tmpl.afterManip( this, fragClone, callback );
					};
				}
				oldManip.apply( this, dmArgs );
			} else {
				oldManip.apply( this, arguments );
			}
			cloneIndex = 0;
			if ( !appendToTmplItems ) {
				jQuery.tmpl.complete( newTmplItems );
			}
			return this;
		}
	});

	jQuery.extend({
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( tmpl, data, options, parentItem ) {
			var ret, topLevel = !parentItem;
			if ( topLevel ) {
				// This is a top-level tmpl call (not from a nested template using {{tmpl}})
				parentItem = topTmplItem;
				tmpl = jQuery.template[tmpl] || jQuery.template( null, tmpl );
				wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
			} else if ( !tmpl ) {
				// The template item is already associated with DOM - this is a refresh.
				// Re-evaluate rendered template for the parentItem
				tmpl = parentItem.tmpl;
				newTmplItems[parentItem.key] = parentItem;
				parentItem.nodes = [];
				if ( parentItem.wrapped ) {
					updateWrapped( parentItem, parentItem.wrapped );
				}
				// Rebuild, without creating a new template item
				return jQuery( build( parentItem, null, parentItem.tmpl( jQuery, parentItem ) ));
			}
			if ( !tmpl ) {
				return []; // Could throw...
			}
			if ( typeof data === "function" ) {
				data = data.call( parentItem || {} );
			}
			if ( options && options.wrapped ) {
				updateWrapped( options, options.wrapped );
			}
			ret = jQuery.isArray( data ) ?
				jQuery.map( data, function( dataItem ) {
					return dataItem ? newTmplItem( options, parentItem, tmpl, dataItem ) : null;
				}) :
				[ newTmplItem( options, parentItem, tmpl, data ) ];
			return topLevel ? jQuery( build( parentItem, null, ret ) ) : ret;
		},

		// Return rendered template item for an element.
		tmplItem: function( elem ) {
			var tmplItem;
			if ( elem instanceof jQuery ) {
				elem = elem[0];
			}
			while ( elem && elem.nodeType === 1 && !(tmplItem = jQuery.data( elem, "tmplItem" )) && (elem = elem.parentNode) ) {}
			return tmplItem || topTmplItem;
		},

		// Set:
		// Use $.template( name, tmpl ) to cache a named template,
		// where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
		// Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

		// Get:
		// Use $.template( name ) to access a cached template.
		// Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
		// will return the compiled template, without adding a name reference.
		// If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
		// to $.template( null, templateString )
		template: function( name, tmpl ) {
			if (tmpl) {
				// Compile template and associate with name
				if ( typeof tmpl === "string" ) {
					// This is an HTML string being passed directly in.
					tmpl = buildTmplFn( tmpl )
				} else if ( tmpl instanceof jQuery ) {
					tmpl = tmpl[0] || {};
				}
				if ( tmpl.nodeType ) {
					// If this is a template block, use cached copy, or generate tmpl function and cache.
					tmpl = jQuery.data( tmpl, "tmpl" ) || jQuery.data( tmpl, "tmpl", buildTmplFn( tmpl.innerHTML ));
					// Issue: In IE, if the container element is not a script block, the innerHTML will remove quotes from attribute values whenever the value does not include white space.
					// This means that foo="${x}" will not work if the value of x includes white space: foo="${x}" -> foo=value of x.
					// To correct this, include space in tag: foo="${ x }" -> foo="value of x"
				}
				return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
			}
			// Return named compiled template
			return name ? (typeof name !== "string" ? jQuery.template( null, name ):
				(jQuery.template[name] ||
					// If not in map, and not containing at least on HTML tag, treat as a selector.
					// (If integrated with core, use quickExpr.exec)
					jQuery.template( null, htmlExpr.test( name ) ? name : jQuery( name )))) : null;
		},

		encode: function( text ) {
			// Do HTML encoding replacing < > & and ' and " by corresponding entities.
			return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
		}
	});

	jQuery.extend( jQuery.tmpl, {
		tag: {
			"tmpl": {
				_default: { $2: "null" },
				open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
				// tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
				// This means that {{tmpl foo}} treats foo as a template (which IS a function).
				// Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
			},
			"wrap": {
				_default: { $2: "null" },
				open: "$item.calls(__,$1,$2);__=[];",
				close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
			},
			"each": {
				_default: { $2: "$index, $value" },
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {
				open: "if(($notnull_1) && $1a){",
				close: "}"
			},
			"else": {
				_default: { $1: "true" },
				open: "}else if(($notnull_1) && $1a){"
			},
			"html": {
				// Unecoded expression evaluation.
				open: "if($notnull_1){__.push($1a);}"
			},
			"=": {
				// Encoded expression evaluation. Abbreviated form is ${}.
				_default: { $1: "$data" },
				open: "if($notnull_1){__.push($.encode($1a));}"
			},
			"!": {
				// Comment tag. Skipped by parser
				open: ""
			}
		},

		// This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
		complete: function( items ) {
			newTmplItems = {};
		},

		// Call this from code which overrides domManip, or equivalent
		// Manage cloning/storing template items etc.
		afterManip: function afterManip( elem, fragClone, callback ) {
			// Provides cloned fragment ready for fixup prior to and after insertion into DOM
			var content = fragClone.nodeType === 11 ?
				jQuery.makeArray(fragClone.childNodes) :
				fragClone.nodeType === 1 ? [fragClone] : [];

			// Return fragment to original caller (e.g. append) for DOM insertion
			callback.call( elem, fragClone );

			// Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
			storeTmplItems( content );
			cloneIndex++;
		}
	});

	//========================== Private helper functions, used by code above ==========================

	function build( tmplItem, nested, content ) {
		// Convert hierarchical content into flat string array
		// and finally return array of fragments ready for DOM insertion
		var frag, ret = content ? jQuery.map( content, function( item ) {
			return (typeof item === "string") ?
				// Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
				(tmplItem.key ? item.replace( /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2" ) : item) :
				// This is a child template item. Build nested template.
				build( item, tmplItem, item._ctnt );
		}) :
		// If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}.
		tmplItem;
		if ( nested ) {
			return ret;
		}

		// top-level template
		ret = ret.join("");

		// Support templates which have initial or final text nodes, or consist only of text
		// Also support HTML entities within the HTML markup.
		ret.replace( /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function( all, before, middle, after) {
			frag = jQuery( middle ).get();

			storeTmplItems( frag );
			if ( before ) {
				frag = unencode( before ).concat(frag);
			}
			if ( after ) {
				frag = frag.concat(unencode( after ));
			}
		});
		return frag ? frag : unencode( ret );
	}

	function unencode( text ) {
		// Use createElement, since createTextNode will not render HTML entities correctly
		var el = document.createElement( "div" );
		el.innerHTML = text;
		return jQuery.makeArray(el.childNodes);
	}

	// Generate a reusable function that will serve to render a template against data
	function buildTmplFn( markup ) {
		return new Function("jQuery","$item",
			// Use the variable __ to hold a string array while building the compiled template. (See https://github.com/jquery/jquery-tmpl/issues#issue/10).
			"var $=jQuery,call,__=[],$data=$item.data;" +

			// Introduce the data as local variables using with(){}
			"with($data){__.push('" +

			// Convert the template into pure JavaScript
			jQuery.trim(markup)
				.replace( /([\\'])/g, "\\$1" )
				.replace( /[\r\t\n]/g, " " )
				.replace( /\$\{([^\}]*)\}/g, "{{= $1}}" )
				.replace( /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
				function( all, slash, type, fnargs, target, parens, args ) {
					var tag = jQuery.tmpl.tag[ type ], def, expr, exprAutoFnDetect;
					if ( !tag ) {
						throw "Unknown template tag: " + type;
					}
					def = tag._default || [];
					if ( parens && !/\w$/.test(target)) {
						target += parens;
						parens = "";
					}
					if ( target ) {
						target = unescape( target );
						args = args ? ("," + unescape( args ) + ")") : (parens ? ")" : "");
						// Support for target being things like a.toLowerCase();
						// In that case don't call with template item as 'this' pointer. Just evaluate...
						expr = parens ? (target.indexOf(".") > -1 ? target + unescape( parens ) : ("(" + target + ").call($item" + args)) : target;
						exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
					} else {
						exprAutoFnDetect = expr = def.$1 || "null";
					}
					fnargs = unescape( fnargs );
					return "');" +
						tag[ slash ? "close" : "open" ]
							.split( "$notnull_1" ).join( target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true" )
							.split( "$1a" ).join( exprAutoFnDetect )
							.split( "$1" ).join( expr )
							.split( "$2" ).join( fnargs || def.$2 || "" ) +
						"__.push('";
				}) +
			"');}return __;"
		);
	}
	function updateWrapped( options, wrapped ) {
		// Build the wrapped content.
		options._wrap = build( options, true,
			// Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
			jQuery.isArray( wrapped ) ? wrapped : [htmlExpr.test( wrapped ) ? wrapped : jQuery( wrapped ).html()]
		).join("");
	}

	function unescape( args ) {
		return args ? args.replace( /\\'/g, "'").replace(/\\\\/g, "\\" ) : null;
	}
	function outerHtml( elem ) {
		var div = document.createElement("div");
		div.appendChild( elem.cloneNode(true) );
		return div.innerHTML;
	}

	// Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
	function storeTmplItems( content ) {
		var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
		for ( i = 0, l = content.length; i < l; i++ ) {
			if ( (elem = content[i]).nodeType !== 1 ) {
				continue;
			}
			elems = elem.getElementsByTagName("*");
			for ( m = elems.length - 1; m >= 0; m-- ) {
				processItemKey( elems[m] );
			}
			processItemKey( elem );
		}
		function processItemKey( el ) {
			var pntKey, pntNode = el, pntItem, tmplItem, key;
			// Ensure that each rendered template inserted into the DOM has its own template item,
			if ( (key = el.getAttribute( tmplItmAtt ))) {
				while ( pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute( tmplItmAtt ))) { }
				if ( pntKey !== key ) {
					// The next ancestor with a _tmplitem expando is on a different key than this one.
					// So this is a top-level element within this template item
					// Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
					pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute( tmplItmAtt ) || 0)) : 0;
					if ( !(tmplItem = newTmplItems[key]) ) {
						// The item is for wrapped content, and was copied from the temporary parent wrappedItem.
						tmplItem = wrappedItems[key];
						tmplItem = newTmplItem( tmplItem, newTmplItems[pntNode]||wrappedItems[pntNode] );
						tmplItem.key = ++itemKey;
						newTmplItems[itemKey] = tmplItem;
					}
					if ( cloneIndex ) {
						cloneTmplItem( key );
					}
				}
				el.removeAttribute( tmplItmAtt );
			} else if ( cloneIndex && (tmplItem = jQuery.data( el, "tmplItem" )) ) {
				// This was a rendered element, cloned during append or appendTo etc.
				// TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
				cloneTmplItem( tmplItem.key );
				newTmplItems[tmplItem.key] = tmplItem;
				pntNode = jQuery.data( el.parentNode, "tmplItem" );
				pntNode = pntNode ? pntNode.key : 0;
			}
			if ( tmplItem ) {
				pntItem = tmplItem;
				// Find the template item of the parent element.
				// (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
				while ( pntItem && pntItem.key != pntNode ) {
					// Add this element as a top-level node for this rendered template item, as well as for any
					// ancestor items between this item and the item of its parent element
					pntItem.nodes.push( el );
					pntItem = pntItem.parent;
				}
				// Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
				delete tmplItem._ctnt;
				delete tmplItem._wrap;
				// Store template item as jQuery data on the element
				jQuery.data( el, "tmplItem", tmplItem );
			}
			function cloneTmplItem( key ) {
				key = key + keySuffix;
				tmplItem = newClonedItems[key] =
					(newClonedItems[key] || newTmplItem( tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent ));
			}
		}
	}

	//---- Helper functions for template item ----

	function tiCalls( content, tmpl, data, options ) {
		if ( !content ) {
			return stack.pop();
		}
		stack.push({ _: content, tmpl: tmpl, item:this, data: data, options: options });
	}

	function tiNest( tmpl, data, options ) {
		// nested template, using {{tmpl}} tag
		return jQuery.tmpl( jQuery.template( tmpl ), data, options, this );
	}

	function tiWrap( call, wrapped ) {
		// nested template, using {{wrap}} tag
		var options = call.options || {};
		options.wrapped = wrapped;
		// Apply the template, which may incorporate wrapped content,
		return jQuery.tmpl( jQuery.template( call.tmpl ), call.data, options, call.item );
	}

	function tiHtml( filter, textOnly ) {
		var wrapped = this._wrap;
		return jQuery.map(
			jQuery( jQuery.isArray( wrapped ) ? wrapped.join("") : wrapped ).filter( filter || "*" ),
			function(e) {
				return textOnly ?
					e.innerText || e.textContent :
					e.outerHTML || outerHtml(e);
			});
	}

	function tiUpdate() {
		var coll = this.nodes;
		jQuery.tmpl( null, null, null, this).insertBefore( coll[0] );
		jQuery( coll ).remove();
	}
})( jQuery );
// Modernizr v1.7  www.modernizr.com
window.Modernizr=function(a,b,c){function G(){e.input=function(a){for(var b=0,c=a.length;b<c;b++)t[a[b]]=!!(a[b]in l);return t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)l.setAttribute("type",f=a[d]),e=l.type!=="text",e&&(l.value=m,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&l.style.WebkitAppearance!==c?(g.appendChild(l),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,g.removeChild(l)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=l.checkValidity&&l.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(l),g.offsetWidth,e=l.value!=m,g.removeChild(l)):e=l.value!=m)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.flexbox=function(){function c(a,b,c,d){a.style.cssText=o.join(b+":"+c+";")+(d||"")}function a(a,b,c,d){b+=":",a.style.cssText=(b+o.join(c+";"+b)).slice(0,-b.length)+(d||"")}var d=b.createElement("div"),e=b.createElement("div");a(d,"display","box","width:42px;padding:0;"),c(e,"box-flex","1","width:10px;"),d.appendChild(e),g.appendChild(d);var f=e.offsetWidth===42;d.removeChild(e),g.removeChild(d);return f},r.canvas=function(){var a=b.createElement("canvas");return a.getContext&&a.getContext("2d")},r.canvastext=function(){return e.canvas&&C(b.createElement("canvas").getContext("2d").fillText,"function")},r.webgl=function(){return!!a.WebGLRenderingContext},r.touch=function(){return"ontouchstart"in a||w("@media ("+o.join("touch-enabled),(")+"modernizr)")},r.geolocation=function(){return!!navigator.geolocation},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){var b=!!a.openDatabase;return b},r.indexedDB=function(){for(var b=-1,c=p.length;++b<c;){var d=p[b].toLowerCase();if(a[d+"_indexedDB"]||a[d+"IndexedDB"])return!0}return!1},r.hashchange=function(){return x("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return !!(a.history&&history.pushState)},r.draganddrop=function(){return x("dragstart")&&x("drop")},r.websockets=function(){return"WebSocket"in a},r.rgba=function(){A("background-color:rgba(150,255,150,.5)");return D(k.backgroundColor,"rgba")},r.hsla=function(){A("background-color:hsla(120,40%,100%,.5)");return D(k.backgroundColor,"rgba")||D(k.backgroundColor,"hsla")},r.multiplebgs=function(){A("background:url(//:),url(//:),red url(//:)");return(new RegExp("(url\\s*\\(.*?){3}")).test(k.background)},r.backgroundsize=function(){return F("backgroundSize")},r.borderimage=function(){return F("borderImage")},r.borderradius=function(){return F("borderRadius","",function(a){return D(a,"orderRadius")})},r.boxshadow=function(){return F("boxShadow")},r.textshadow=function(){return b.createElement("div").style.textShadow===""},r.opacity=function(){B("opacity:.55");return/^0.55$/.test(k.opacity)},r.cssanimations=function(){return F("animationName")},r.csscolumns=function(){return F("columnCount")},r.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";A((a+o.join(b+a)+o.join(c+a)).slice(0,-a.length));return D(k.backgroundImage,"gradient")},r.cssreflections=function(){return F("boxReflect")},r.csstransforms=function(){return!!E(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])},r.csstransforms3d=function(){var a=!!E(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in g.style&&(a=w("@media ("+o.join("transform-3d),(")+"modernizr)"));return a},r.csstransitions=function(){return F("transitionProperty")},r.fontface=function(){var a,c,d=h||g,e=b.createElement("style"),f=b.implementation||{hasFeature:function(){return!1}};e.type="text/css",d.insertBefore(e,d.firstChild),a=e.sheet||e.styleSheet;var i=f.hasFeature("CSS2","")?function(b){if(!a||!b)return!1;var c=!1;try{a.insertRule(b,0),c=/src/i.test(a.cssRules[0].cssText),a.deleteRule(a.cssRules.length-1)}catch(d){}return c}:function(b){if(!a||!b)return!1;a.cssText=b;return a.cssText.length!==0&&/src/i.test(a.cssText)&&a.cssText.replace(/\r+|\n+/g,"").indexOf(b.split(" ")[0])===0};c=i('@font-face { font-family: "font"; src: url(data:,); }'),d.removeChild(e);return c},r.video=function(){var a=b.createElement("video"),c=!!a.canPlayType;if(c){c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var d='video/mp4; codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+', mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}return c},r.audio=function(){var a=b.createElement("audio"),c=!!a.canPlayType;c&&(c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"'),c.mp3=a.canPlayType("audio/mpeg;"),c.wav=a.canPlayType('audio/wav; codecs="1"'),c.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;"));return c},r.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},r.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},r.webWorkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.smil=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"animate")))},r.svgclippaths=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"clipPath")))};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,f&&a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function p(a,b){var c=-1,d=a.length,e,f=[];while(++c<d)e=a[c],(b=e.media||b)!="screen"&&f.push(p(e.imports,b),e.cssText);return f.join("")}function o(a){var b=-1;while(++b<e)a.createElement(d[b])}var c="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",d=c.split("|"),e=d.length,f=new RegExp("(^|\\s)("+c+")","gi"),g=new RegExp("<(/*)("+c+")","gi"),h=new RegExp("(^|[^\\n]*?\\s)("+c+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),i=b.createDocumentFragment(),j=b.documentElement,k=j.firstChild,l=b.createElement("body"),m=b.createElement("style"),n;o(b),o(i),k.insertBefore(m,k.firstChild),m.media="print",a.attachEvent("onbeforeprint",function(){var a=-1,c=p(b.styleSheets,"all"),k=[],o;n=n||b.body;while((o=h.exec(c))!=null)k.push((o[1]+o[2]+o[3]).replace(f,"$1.iepp_$2")+o[4]);m.styleSheet.cssText=k.join("\n");while(++a<e){var q=b.getElementsByTagName(d[a]),r=q.length,s=-1;while(++s<r)q[s].className.indexOf("iepp_")<0&&(q[s].className+=" iepp_"+d[a])}i.appendChild(n),j.appendChild(l),l.className=n.className,l.innerHTML=n.innerHTML.replace(g,"<$1font")}),a.attachEvent("onafterprint",function(){l.innerHTML="",j.removeChild(l),j.appendChild(n),m.styleSheet.cssText=""})}(a,b),e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document)
Action = {
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  data : {
    "layup" : {id: "layup", name : "2pt Layup", state : "offense", type : "shot", value : 2},
    "two" : {id: "two", name : "2pt Shot", state : "offense", type : "shot", value : 2},
    "three" : {id: "three", name : "3pt Shot", state : "offense", type : "shot", value : 3},
    "freethrow" : {id: "freethrow", name : "Freethrow", state : "offense", type : "shot", value : 1},
    "orebound" : {id: "orebound", name : "O Rebound", state : "offense", type : "bool", value : null},
    "assist" : {id: "assist", name : "Assist", state : "offense", type : "bool", value : null},
    "turnover" : {id: "turnover", name : "Turnover", state : "offense", type : "bool", value : null},
  
    "steal" : {id: "steal", name : "Steal", state : "defense", type : "bool", value : null},
    "block" : {id: "block", name : "Block", state : "defense", type : "bool", value : null},
    "drebound" : {id: "drebound", name : "D Rebound", state : "defense", type : "bool", value : null},
    "charge" : {id: "charge", name : "Charge", state : "defense", type : "bool", value : null},
    "foul" : {id: "foul", name : "Foul", state : "defense", type : "bool", value : null}
  }
}
var App = {
  gameId : null,
  action : null,
  player : null,
  $actions : null,
  $players : null,
  $playersBench : null,

  start : function(gameId){
    App.gameId = gameId;
    
    console.log(Game.data[gameId]);
    
    if(Game.data[gameId]){
      console.log("existing game!");
      App.init();
      GameView.updateScores();
    }else{
      console.log("load game from database!");
      /*
      to get to this page a game must have been created so
      we'll likely have game data in localStorage. actually should be required
      so we may not need this.
      */
      game = {id: gameId}
      $.getJSON("/teams/1.json", function(data){
        game["home"] = data["team"];
        game["homePlayers"] = data["players"];
      
        $.getJSON("/teams/2.json", function(data){
          game["away"] = data["team"];
          game["awayPlayers"] = data["players"];
        
          localStorage[App.gameId] = JSON.stringify(game);

          App.init();
        });
      });    

    }
  },

  init : function(){
    $("#playerTemplate").template("playerTemplate");
    App.$actions = $("#actions_wrapper");
    App.$players = $("#players_game");
    App.$playersBench = $("#players_bench");

  /* select action interface */  
    App.$actions.find("a").live("tap", function(e){
      App.setAction(this.id);
      
      e.preventDefault();
      return false;
    })
          
  /* select player interface */  
    App.$players.find("a.player").live("tap", function(e){

      var side = $(this).parent().hasClass("home") ? "home" : "away";
      App.setPlayer(side, this.id);
      
      e.preventDefault();
      return false;
    })
        
  /* bench interface */
    $("a.bench").tap(function(e){
      var side = $(this).hasClass("home_bg") ? "home" : "away";
      App.$playersBench.show();
    
      App.$playersBench.find("div.home").hide();
      App.$playersBench.find("div.away").hide();
    
      App.$playersBench.find("div."+side).show();

      e.preventDefault();
      return false;
    });
  
  /* toggle logger */
    $("div.tab").find("span").tap(function(){
      $("div.tab").find("span").show();
      $(this).hide();
      
      var action = $(this).attr("rel");
      $("#log").removeClass("expand contract").addClass(action);
    });
  
  /* undo/redo logged actions */  
    $("a.undo").live("tap", function(e){
      $li = $(this).parent();
      
      if($li.hasClass("undone")){
        Stat.record.apply(this, Stat.parse($(this).attr("rel")));
        $li.remove();
      }else{
        Stat.unRecord.apply(this, Stat.parse($(this).attr("rel")));
        $li.find("a").text("REDO");
      }
      $li.toggleClass("undone");
      
      e.preventDefault();
      return false;
    });
    
  /* close bench */
    $("a.close").tap(function(e){
      $(this).parent().hide();
      e.preventDefault();
      return false;
    });
  
  /* close analytics */
    $("a.close_lick").tap(function(e){
      $("#analytics").hide();
      $("#analytics").find("p").empty();
      e.preventDefault();
      return false;
    });
    
  /* open analytics */
    $("#licks").tap(function(e){
      App.build();
      $("#analytics").show();
      e.preventDefault();
      return false;
    });
        
  /* load teams */
    var home = "pandabots";
    var away = "gametime";
    App.loadTeam("home", home, Team.data[home]);  
    App.loadTeam("away", away, Team.data[away]);  
  },
  
  loadTeam : function(side, team, players){
    $("#"+side+"_name").text(team+ " Bench");
    App.$players.find("div."+side).empty();
    App.$playersBench.find("div."+side).empty();
    
    $.tmpl("playerTemplate", players).appendTo(App.$players.find("div."+side));
    $.tmpl("playerTemplate", players).appendTo(App.$playersBench.find("div."+side));
  },
  
  updateScores : function(){
    var homeScore = 0;
    var awayScore = 0;
    for(var shot in Action.pointValues) {

      var homeKey = App.gameId + ".home." + shot + ".make";
      if(localStorage.hasOwnProperty(homeKey)){
        homeScore += +Action.pointValues[shot] *(localStorage[homeKey].split("|").length - 1);
      }
      
      var awayKey = App.gameId + ".away." + shot + ".make";
      if(localStorage.hasOwnProperty(awayKey)){
        awayScore += +Action.pointValues[shot] *(localStorage[awayKey].split("|").length - 1);
      }
    }

    $("#home_score").text(homeScore);  
    $("#away_score").text(awayScore);  
  },
  
  setAction : function(action){
    Game.action = action;
    $("#hopper").show();
    $("#hopper").find("span").html(action+ " &#10144; <em>now select a player...</em>");
    
    if(Game.player) Stat.record(Game.player, Game.action);
  },  
  
  setPlayer : function(side, player){
    Game.player = side+"."+player;
    $("#hopper").show();
    $("#hopper").find("span").html(side+ " #"+ player + " &#10144; <em>now select an action...</em>");
    
    if(Game.action) Stat.record(Game.player, Game.action);
  },
  
  log : function(message){
    $node = $("<li>"+message+"</li>");
    $("#log").prepend($node);
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
    var $table = $("<table></table>").appendTo($("#analytics").find("p"));
    var data = App.analyze();
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
          var miss = data[player][action+".miss"];
          var make = data[player][action+".make"];
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

  },
  
  analyze : function(){
  // defensive actions only  
    var analysis = {}    
    var x = Action.data.length;
  
  // aggregate all actions from the given Action.data object.
    for(var action in Action.data){
      var homeKey = App.gameId + ".home." + Action.data[action].id;
      if(Action.data[action].type === "shot"){
        aggregate(homeKey, "make");
        aggregate(homeKey, "miss");
      }else{
        aggregate(homeKey);
      }
    }

  // aggregate player action counts from the specified action key/value
    function aggregate(homeKey, value){
      if(value) homeKey += ("."+value);
      if(localStorage.hasOwnProperty(homeKey)){
        var data = localStorage[homeKey].split("|"); 
        var counts = {}
        var x = data.length-1; // subtract empty last array val.
        var val; 
        
      // parse data to retrive players => action counts
        while(x--){
          val = data[x];
          if (counts[val]) counts[val] += 1;
          else counts[val] = 1;
        }
        
      // add action's counts to player object
        for(var player in counts){
          if(!analysis[player]) analysis[player] = {}
          analysis[player][value?action+"."+value:action] = counts[player];
        }
      }
    }
    
    return analysis;
  }
  
}
var Game = {
  data : {
    123 : {
      home : "pandabots",
      away : "gametime",
      timestamp : "2010-10-24 13:07:25"
    }
  }
  
}
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
Stat = {
  
 /* player = "{side}.{number}"
    action = "{action}{.value}"
 */
  record : function(player, action){
    var key = Stat.keyize(player, action);
    var playerId = player.split(".")[1];
    
    if(typeof localStorage[key] === "undefined"){
      localStorage[key] = playerId+"|";
    }else{
      localStorage[key] += playerId+"|";
    }
    
    var side = player.split(".")[0];
    var actionName = action.split(".")[0];
    var value = (typeof action.split(".")[1] == "undefined") ? "" : action.split(".")[1];
    var actionOb = Action.data[actionName];
    App.log('<span>'+ player + " &#10144; " + actionOb.name + " " + value + '!</span> <a href="#" class="undo" rel="'+Stat.asString(player, action)+'">UNDO</a>');
    
    GameView.updateScores();
    App.refresh();
    console.log("blah");
    console.log(localStorage);
  },

  unRecord : function(player, action){
    var key = Stat.keyize(player, action);
    var playerId = player.split(".")[1];
    
    if(key && player && typeof localStorage[key] !== "undefined"){
      localStorage[key] = localStorage[key].replace(playerId+"|", "");
      GameView.updateScores();
    }
  },

  // build the key used to store this player-action
  keyize : function(player, action){
    return [App.gameId, player.split(".")[0], action].join(".");
  },
  
  // stringify a player-action 
  asString : function(player, action){
    return [player, action].join(".");
  },
  
 /* parse asString into player-action  */  
  parse : function(statString){
    var data = statString.split(".");
    var value = (typeof data[3] === "undefined") ? "" : "."+data[3];
    return [data[0]+"."+data[1], data[2]+value];
  }
  
  
}
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
    $("#teamTemplate").template("teamTemplate");

    var qteams = []
    for(var name in Team.data) {
      if(Team.data.hasOwnProperty(name)){ 
        qteams.push({name:name});
      }
    }
    $.tmpl("teamTemplate", qteams).appendTo($("#teams_list"));    


    $("#teams_pane").find("div.team").tap(function(){
      var team = $(this).text().toLowerCase().replace(" ", "-");
      TeamView.init(team);
      
    })
  }
}
var TeamView = {
  teamName : null,
  
  init : function(teamName){
    TeamView.teamName = teamName;
    $("#rosterTemplate").template("rosterTemplate");
    TeamView.loadTeam();
    
  /* add. */
    $("#team_roster").find("div.add").tap(function(){
      var number = $(this).parent().find("input").first().val();
      var name = $(this).parent().find("input").last().val();
      $.tmpl("rosterTemplate", [{name: name, number: number}]).appendTo($("#team_roster").find("div.players"));
      TeamView.update();
    })
  
  /* delete */  
    $("#team_roster").find("div.delete").live("tap", function(){
      $(this).parent().remove();
      TeamView.update();
    })
  },

  loadTeam : function(){
    $.tmpl("rosterTemplate", Team.data[TeamView.teamName]).appendTo($("#team_roster").find("div.players").empty());
  /* Keyup. Todo: need to bind this to new players too. */
    $("#team_roster").find("div.players").find("input").keyup(function(){
      TeamView.update();
    })
    
    $("#title").addClass("active").text("team: "+ TeamView.teamName)
    simpleTabs.clear();
  },
  
  update : function (){
    var players = []
    $("#team_roster").find("div.players").find("div.row").each(function(){
      var number = $(this).find("input").first().val();
      var name = $(this).find("input").last().val();
      players.push({number:number, name:name})
    })
    
    Team.data[TeamView.teamName] = players;
    console.log(Team.data[TeamView.teamName]);
  }
}
