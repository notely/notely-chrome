"use strict";
 
/**
 * NewModule
 * The NewModule module.
 * @author Richard Wålander
 */
define([
	"underscore",
	"ydn"
], function(_, ydn) {
	var schema = {
		stores: [{
			name: 'notes',
			keyPath: 'url', // optional, 
			autoIncrement: false, // optional. 
			indexes: [
				{
					keyPath: 'url'
				},
				{
					keyPath: 'data',
					multiEntry: true
				}
			] // optional, list of index schema as array.
		}]
	};
	var db = new ydn.db.Storage('NoTate', schema);

	var SyncManager = {};
	
	SyncManager.pageSync = function (method, model, options) {
		console.log('sync', method, model);
		var req;
		if(method == 'read') {
			req = db.values('notes')
			.done(function (models) {
				options.success(models);
			})
			.fail(function (e) {
				console.log(e);
			});
		} else if (method == 'create') {
			// req = db.put({name: 'notes', keyPath: 'url'}, model);
			// req.done(function () {
			// 	console.log(e);
			// });
			// req.fail(function (e) {
			// 	console.log(e);
			// });
		} else if (method == 'update') {
			req = db.put({name: 'notes', keyPath: 'url'}, model);
			req.done(function () {
				//console.log(e);
			});
			req.fail(function (e) {
				console.log(e);
			});
		} else if (method == 'delete') {
			if(model == null) {
				db.clear('notes');
			} else {
				req = db.remove('notes', model.url);
				req.done(function () {
					//sendResponse({msg: 'saved'});
				});
				req.fail(function (e) {
					console.log(e);
				});	
			}
		}
		return req;
	};
	
	return SyncManager;
}); 