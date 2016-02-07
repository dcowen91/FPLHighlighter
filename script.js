// Script.js
// Attaches the highlighter script to the DOM

var s = document.createElement('script');
s.src = chrome.extension.getURL('PLscript.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);