// POPUP.js
// Handles managing the color picker popup

var colors = {"_PLTeamColor": "blue", "_PLWatchColor" : "orange"};

function setCurrentColor(storageName, color)
{
	$("#" + storageName + "Parent").children().removeClass("currentColor");
	var colorDiv = $("#" + storageName + "Parent").children().filter( function() { return $(this).css("background-color") == color;});
	colorDiv.addClass("currentColor");
}	

function saveCurrentColor(storageName)
{
	colors[storageName] = $("#" + storageName + "Parent").children(".currentColor").css("background-color");
}

function getColorFromStorage(storageName)
{
	chrome.storage.sync.get(storageName, function(result)
	{
		if (result && result[storageName])
		{
			colors[storageName] = result[storageName];
		}
	});
	setCurrentColor(storageName, colors[storageName]);
}

function calculateButtonStates()
{
	var teamMatch = $("#_PLTeamColorParent").children(".currentColor").css("background-color") === colors["_PLTeamColor"];
	var watchMatch = $("#_PLWatchColorParent").children(".currentColor").css("background-color") === colors["_PLWatchColor"];
	if ( teamMatch && watchMatch)
	{
		$("#resetColors").prop("disabled", true);
		$("#saveColors").prop("disabled", true);
	}
	else 
	{
		$("#resetColors").prop("disabled", false);
		$("#saveColors").prop("disabled", false);
	}
}

$(document).ready(function() 
{
	$(".colorChoice").click(function() 
	{
		$(this).parent().children().removeClass("currentColor");
		$(this).addClass("currentColor");
		calculateButtonStates();
	});

	$("#resetColors").click(function() 
	{
		setCurrentColor("_PLTeamColor", colors["_PLTeamColor"]);
		setCurrentColor("_PLWatchColor", colors["_PLWatchColor"]);
		calculateButtonStates();
	});

	$("#saveColors").click(function()
	{
		saveCurrentColor("_PLTeamColor");
		saveCurrentColor("_PLWatchColor");
		chrome.storage.sync.set(colors);
		calculateButtonStates();
	});

	$("#closeButton").click(function()
	{
		window.close();
	})

	getColorFromStorage("_PLTeamColor");
	getColorFromStorage("_PLWatchColor");
});