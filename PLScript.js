var _PLCOLOR = "yellow";
//TODO: pull this from local store

function collectTeamMembers() {
	var anchors =  $(".ismDataOriginal a.ismViewProfile");
	return $.map(anchors, function(value) { 
		var index = value.href.indexOf("#");
		return value.href.substring(index);
	});
}

function waitAndShowPlayers()
{
	window.setTimeout(function() {
		tagPlayers();
	}, 1000);
}

function tagPlayers() {
	console.log(chrome.storage);
	$.each(_playerIds, function(index, value) {
		var selector = ".ismAddElement[href='" + value + "']";
		$(selector).parent().parent().css("background-color", _PLCOLOR);
	});
}


var _playerIds = collectTeamMembers();
waitAndShowPlayers();

$("#ism").on("elementListDisplayFinish", waitAndShowPlayers);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    _PLCOLOR = request.text;
	tagPlayers();
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });