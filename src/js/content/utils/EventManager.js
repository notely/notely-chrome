(function (App, _) {
	var EventManager =
	App.Utils.EventManager =
	function () {
		var _self = this;
		chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(request, sender);

			_(_self.listners).each(function (listner) {
				if(listner.event === request.event) listner.cb(request, sender, sendResponse);
			}, _self);
			// if (request.event == event) {
			// 	cb(request);
			// 	if(res)
			// 		sendResponse(res);
			// } 
			return true;
		});
	};

	EventManager.prototype = {
		listners: [],
		on: function (event, cb) {
			this.listners.push({event: event, cb: cb});
		},
		off: function (event, cb) {
			_(this.listners).each(function (listner) {
				if(listner.event === event && listner.cb === cb) {
					this.listners.pop(listner);
				}
			}, this);
		},
		trigger: function (event, data, cb) {
			chrome.runtime.sendMessage({event: event, data: data}, function (response) {
				if(cb) cb(response);
			});
		}
	};
})(App, _);