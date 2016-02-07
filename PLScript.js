// PLScript.js
// Updates the DOM with highlighted colors

var colors = {"_PLTeamColor": "yellow", "_PLWatchColor" : "red"};
var _teamIds;
var _watchIds;

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
		showPlayers();
	}, 405);
	// FPL site updates html by .fadeOut(400).fadeIn(400), so wait 400 + small buffer
}

function showPlayers()
{
	_teamIds = collectTeamMembers();
	_watchIds = collectWatchList();

	tagPlayers(_watchIds, colors["_PLWatchColor"]);
	tagPlayers(_teamIds, colors["_PLTeamColor"]);
}

function tagPlayers(ids, color) 
{
	$.each(ids, function(index, value) 
	{
		if (!!value)
		{
			var selector = ".ismAddElement[href='#" + value + "']";
			$(selector).parent().parent().css("background-color", color);
			$(selector).parent().parent().css("font-weight", "bold");
		}
	});
}

$("#ism").on("elementListDisplayFinish", waitAndShowPlayers);

document.addEventListener('colorChanged', function (e)
{
	var data=e.detail;
	console.log("received "+data);
	colors[data.name] = data.color;
	showPlayers();
});