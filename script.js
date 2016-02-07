// Script.js
// Attaches the highlighter script to the DOM

var s = document.createElement('script');
s.src = chrome.extension.getURL('PLscript.js');
s.onload = function() 
{
	this.parentNode.removeChild(this);

	chrome.storage.sync.get(["_PLTeamColor", "_PLWatchColor"], function(values)
	{
		for(key in values)
		{
			var colorValue = values[key];
			var data = {name: key, color: colorValue};
			sendColors(data);
		}
	});
};
(document.head||document.documentElement).appendChild(s);


chrome.storage.onChanged.addListener(function(changes, namespace) 
{
	for (key in changes) 
	{
		var storageChange = changes[key];
		var data = {name: key, color: storageChange.newValue};
		sendColors(data);
	}
});

function sendColors(data)
{
	var evt=document.createEvent("CustomEvent");
	evt.initCustomEvent("colorChanged", true, true, data);
	document.dispatchEvent(evt);
}