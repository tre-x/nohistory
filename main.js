// https://sites.google.com/site/tredashx/
function set(key, value){
	localStorage.setItem(key, Number(value))
}

function get(key){
	return Number(localStorage.getItem(key))
}

function playBadge(){
	console.log('enabled history logging')
	chrome.browserAction.setBadgeText({text: '▶'});
}

function stopBadge(){
	console.log('disabled history logging')
	chrome.browserAction.setBadgeText({text: '■'})
}

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		alert('Quick start: Click the extension icon to enable/disable history logging. Play badge = History Enabled; Stop badge = History Disabled')
		set('step', 1)
		set('stop', 1)
		stopBadge()
    }
});

chrome.browserAction.onClicked.addListener(function (){ // will not be used after first install unless its clicked for the first time

	set('step', get('step') + 1)


	if (get('step') == 1){
		stopBadge()
		set('stop', 1)
	}

	if (get('step') == 2){
		set('step', 0)
		playBadge()
		set('stop', 0)
	}

})

chrome.history.onVisited.addListener(function(item) {
	if (get('stop') == 1) {
		console.log('stop is on')
	    chrome.history.deleteUrl({"url": item.url});
	}
});
// tre-x was here