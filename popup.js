// POPUP.js
// Handles managing the color picker popup

function setColor(itemContainerName, color)
{
	if (itemContainerName.startsWith("team"))
	{
		$("#teamColor").css("background-color", color);
		chrome.storage.sync.set({"_PLTeamColor" : color});
	}
	else if (itemContainerName.startsWith("watch"))
	{
		$("#watchColor").css("background-color", color);
		chrome.storage.sync.set({"_PLWatchColor" : color});
	}
}

function getColorFromStorage(divName, storageName)
{
	chrome.storage.sync.get(storageName, function(result) 
	{
		if ( result && result[storageName])
		{
			setColor(divName, result[storageName]);
		}
	});	
}

$(document).ready(function() 
{
	$("#teamContainer").click( function() 
	{
		$("#teamChoices").toggle();
	});
	$("#watchContainer").click( function() 
	{
		$("#watchChoices").toggle();
	});

	$(".colorChoice").click( function() 
	{
		var color = $(this).css("background-color");
		var item = $(this).parent().attr("id");
		setColor(item, color);
	})

	getColorFromStorage("team", "_PLTeamColor");
	getColorFromStorage("watch", "_PLWatchColor");
});