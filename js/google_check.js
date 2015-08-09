

var callbackWait = {};
var cache = {};
function getStatus(url, callback) {
    if (url in cache) callback(cache[url]);

    if (url in callbackWait) return callbackWait[url].push(callback);
    else callbackWait[url] = [callback];
    callback = function () {
        var fn; while ('function' == typeof (fn = callbackWait[url].shift())) fn.apply(null, arguments);
    };

    chrome.extension.sendRequest({ method: "isBlock", url: url }, function (response) {
        callback(cache[url] = response.isBlock);
    });
}

$(document).ready(function () {


    function check() {
        var links = null;
        var style = null;
        if ($("#logocont").size()) {
            style = "new";
            links = $("h3.r > a");
        }
        else if ($("#mainResults").size()) {
            style = "old";
            links = $(".resultTitlePane > a.resultTitle");
        }
        else {
            style = "old";
            links = $("p > a ,.g > a.l");
        }

        if (!links || !links.size()) {
            style = "old";
            links = $("#main_results_ul > li > a");
        }

        if (!links || !links.size()) {
            style = "old";
            links = $(".text_results > ul > li > a");
        }

        links.each(function (index) {
            var a_href = $(this);

            if (a_href.prev().is(".glinks-check-icon")) return;

            a_href.before('<span class="glinks-check-icon glinks-check-load" > </span>');
            var match_url = null;
            if (style == "new") match_url = a_href.attr("href").match(/q=(.*)&sa/);

            var url = (style == "new" && match_url) ? decodeURI(match_url[1]) : a_href.attr("href");

            getStatus(url, function (isBlock) {
                var classname = "";
                if (isBlock == 0) {
                    classname = "glinks-check-free";
                } else if (isBlock == 1) {
                    classname = "glinks-check-block";
                } else if (isBlock == 2) {
                    classname = "glinks-check-unknown";
                }
                a_href.prev().removeClass("glinks-check-load").addClass(classname);
            });
        });
    }

    var timeout;
    document.addEventListener("DOMSubtreeModified", function (ev) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            check();
        }, 500);
    }, false);
    check();
});
