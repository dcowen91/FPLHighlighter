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
	$.each(_playerIds, function(index, value) {
		var selector = ".ismAddElement[href='" + value + "']";
		$(selector).parent().parent().css("background-color", "yellow");
	});
}

var _playerIds = collectTeamMembers();
tagPlayers();

$("#ism").on("elementListDisplayFinish", waitAndShowPlayers);