function setColor(itemContainerName, color)
{
	if (itemContainerName.startsWith("team"))
	{
		$("#teamColor").css("background-color", color);
		chrome.storage.sync.set({"_PLTeamColor" : color});
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    		console.log(response.farewell);
  			});
		});
	}
	else if (itemContainerName.startsWith("watch"))
	{
		$("#watchColor").css("background-color", color);
		//update background script now
	}
}

$(document).ready(function() {
	$("#teamContainer").click( function() {
		$("#teamChoices").toggle();
	});
	$("#watchContainer").click( function() {
		$("#watchChoices").toggle();
	});

	$(".colorChoice").click( function() {
		var color = $(this).css("background-color");
		var item = $(this).parent().attr("id");
		setColor(item, color);
	})

	chrome.storage.sync.get("_PLTeamColor", function(result) {
		if ( result && result["_PLTeamColor"])
		{
			setColor("team", result["_PLTeamColor"]);
		}
	});
	//TODO: Fade in

	//TODO: make color choices take effect

	//TODO: popup.css & clean up

	//TODO: navbar icons

	//TODO: flyout css
});