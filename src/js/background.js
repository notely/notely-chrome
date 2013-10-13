chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
	// console.log(sender.tab ?
	// 	"from a content script:" + sender.tab.url :
	// 	"from the extension");
	// if (request.greeting == "hello")
	// 	sendResponse({farewell: "goodbye"});
	console.log(request, sender);
	if(request.crud == 'read') {
		// console.log(chrome);
		chrome.storage.sync.get(sender.tab.url, function (models) {
			console.log('read', models);
			sendResponse({models: models[sender.tab.url]});
		});
	} else if (request.crud == 'create') {
		console.log('create', request.models);
		var obj = {};
		obj[sender.tab.url] = request.models;
		chrome.storage.sync.set(obj, function () {
			sendResponse({msg: 'saved'});
		});
	} else if (request.crud == 'delete') {
		console.log('delete', request.models);
		var obj = {};
		obj[sender.tab.url] = request.models;
		chrome.storage.sync.set(obj, function () {
			sendResponse({msg: 'saved'});
		});
	}
	return true;
});