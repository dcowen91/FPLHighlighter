var _PLCOLOR = "yellow";
var _WATCHCOLOR = "red";
var _teamIds;
var _watchIds;
//TODO: pull this from local store

function collectTeamMembers() 
{
	var ids = $('#ismJson').metadata().elements;
	return ids;
}

function collectWatchList()
{
	var ids = $('#ismJson').metadata().watchlist;
	return ids;
}


function waitAndShowPlayers()
{
	window.setTimeout(function() 
	{
		_teamIds = collectTeamMembers();
		_watchIds = collectWatchList();
		
		tagPlayers(_watchIds, _WATCHCOLOR);
		tagPlayers(_teamIds, _PLCOLOR);

	}, 850);
}

function tagPlayers(ids, color) 
{
	console.log(chrome.storage);
	$.each(ids, function(index, value) 
	{
		if (!!value)
		{
			var selector = ".ismAddElement[href='#" + value + "']";
			$(selector).parent().parent().css("background-color", color);
		}
	});
}

waitAndShowPlayers();

$("#ism").on("elementListDisplayFinish", waitAndShowPlayers);

//TODO move this functionality to content script


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) 
//   {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     _PLCOLOR = request.text;
// 	tagPlayers();
//     if (request.greeting == "hello")
//       sendResponse({farewell: "goodbye"});
//   });