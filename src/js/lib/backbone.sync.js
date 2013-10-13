(function () {
	var Backbone = window.Backbone;
	Backbone.sync = function (method, model) {
		console.log('sync', method, model, location);
		if(method == 'read') {
			chrome.runtime.sendMessage({crud: "read"}, function (response) {
				if (response.models) {
					var models = JSON.parse(response.models);
					model.reset(models);
					console.log(model);
				}
			});
		} else if (method == 'create') {
			chrome.runtime.sendMessage({
				crud: 'create',
				models: JSON.stringify(model.collection)
			}, function (res) {
				console.log(res);
			});
		} else if (method == 'delete') {
			var col = model.collection;
			col.remove(model);
			chrome.runtime.sendMessage({
				crud: 'delete',
				models: JSON.stringify(col)
			}, function (res) {
				console.log(res);
			});
		}
	}
})();