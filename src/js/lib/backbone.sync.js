(function () {
	var Backbone = window.Backbone;
	Backbone.sync = function (method, model) {
		console.log('sync', method, model, location);
		if(method == 'read') {
			chrome.runtime.sendMessage({event: "notes.read"}, function (response) {
				if (response.models) {
					// var models = JSON.parse(response.models);
					var models = response.models;
					model.reset(models);
					console.log(model);
				}
			});
		} else if (method == 'create') {
			chrome.runtime.sendMessage({
				event: 'notes.create',
				// models: JSON.stringify(model.collection)
				models: model.collection.toJSON()
			}, function (res) {
				console.log(res);
			});
		} else if (method == 'delete') {
			var col = model.collection;
			col.remove(model);
			chrome.runtime.sendMessage({
				event: 'notes.delete',
				// models: JSON.stringify(col)
				models: col.toJSON()
			}, function (res) {
				console.log(res);
			});
		}
	}
})();