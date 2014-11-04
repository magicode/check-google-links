



chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	
	if (request.method == "localStorage")
		sendResponse({localStorage: localStorage});
	if (request.method == "isBlock"){
		
		
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				sendResponse({ 
					isBlock: 
						req.getResponseHeader("Rimon")  == "RWC_BLOCK" || 
						req.getResponseHeader("Server") == "Livigent"  || 
						req.responseURL.indexOf("blocked.aspx?CatID") != -1 ||
						req.status >= 400
				}); 
			}
		};
		req.open("GET", request.url, true);
		req.send(null);
		
	}
	else
		sendResponse({});
});
