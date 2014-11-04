

var options = false;

chrome.extension.sendRequest({method: "localStorage"}, function(response) {
	options = response.localStorage;

	(function() {
		
		var url = window.location.href;
		
		if(url.match(/members\.etrog\.net\.il\/\?a=block\/block1/))
		{
				var blockWord = ($("#article > span:last-child").text().replace(/^\s+|\s+$/g, "") == "0");
				$("#article > span:last-child").css("display","block");
				var blockUrl = document.referrer || url.match("&?url=([^&]+)&?")[1]  ;
				
				if(blockUrl)
				{
					var blockUrl = decodeURIComponent(blockUrl);
					$("#article > span:last-child").text(blockUrl);
					
					var butt = $("#article > button:first-of-type");
					var onclick = butt.attr("onclick");
					
					butt.attr("onclick",
							butt.attr("onclick").replace(/url=[^"&']*/, "url=" + encodeURIComponent(blockUrl) )
							);
					
					$(".article [color='#3fa50a'][size='4']").append(blockWord ? ' <br> (מילה לא ראויה בדף)' : '');
				}
			
			
			
		}
		
		
		if(url.match(/www\.neto\.net\.il/) && options["etrog_fix_email"])
		{
			$("#email").val(options["etrog_fix_email"]);
		}
	
		
		
	})()/*)*/;
});