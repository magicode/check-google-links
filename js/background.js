



chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "localStorage")
    	
      sendResponse({localStorage: localStorage});
    else
      sendResponse({}); // snub them.
});