

var callbackWait = {};
var cache = {};
function getStatus (url,callback){
	if(url in cache) callback(cache[url]);
	
	if(url in callbackWait)return callbackWait[url].push(callback);
	else callbackWait[url] = [callback];
	callback = function(){
		var fn;while('function' == typeof (fn = callbackWait[url].shift())) fn.apply(null,arguments);
	};
	$.ajax({
		  type: "GET",
		  url: url ,
		  success: function(message , text ,response) {
			  cache[url] = response.getResponseHeader("Rimon") == "RWC_BLOCK" ||  response.getResponseHeader("Server") == "Livigent" 
				  || message.indexOf("blocked.aspx?CatID") != -1 ;
			  callback( cache[url] );
		  }
	});
}

$(document).ready(function() {
	
	
	function check(){
		var links = null;
		var style =  null;
		if( $("#logocont").size() )
		{
			style = "new";
			links = $("h3.r > a");
		}
		else if($("#mainResults").size())
		{
			style = "old";
			links = $(".resultTitlePane > a.resultTitle");
		}
		else
		{
			style = "old";
			links = $("p > a ,.g > a.l");
		}
		
		links.each( function( index ) {
			var a_href = $(this);
			
			if(a_href.prev().is(".glinks-check-icon")) return;
			
			a_href.before('<span class="glinks-check-icon glinks-check-load" > </span>');
			var match_url = null;
			if(style == "new") match_url = a_href.attr("href").match(/q=(.*)&sa/);
			
			var url = (style == "new" && match_url) ? decodeURI(match_url[1]) : a_href.attr("href");
			
			getStatus(url,function(isBlock){
				  a_href.prev().removeClass("glinks-check-load").addClass( isBlock ? "glinks-check-block"  : "glinks-check-free");
			});
		});
	}
	
	var timeout;
	document.addEventListener("DOMSubtreeModified", function (ev) {
	    clearTimeout(timeout);
	    timeout = setTimeout(function(){
	    	check();
	    },500);
	}, false);
	check();
});