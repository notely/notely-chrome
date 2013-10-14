"use strict";
 
/**
 * App
 * The background App module.
 * @author Richard Wålander
 */
define([
	"ydn",
	"underscore"
], function(ydn, _) {
	var db = new ydn.db.Storage('NoTate');
	
	chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request, sender);
		if(request.crud == 'read') {
			// console.log(chrome);
			db.get('notes', sender.tab.url)
			.done(function (models) {
				console.log('read', models.data);
				sendResponse({models: models.data});
			})
			.fail(function (e) {
				sendResponse({err: e});
			});
			/*chrome.storage.sync.get(sender.tab.url, function (models) {
				console.log('read', models);
				sendResponse({models: models[sender.tab.url]});
			});*/
		} else if (request.crud == 'create') {
			console.log('create', request.models);
			var key = sender.tab.url;

			console.log(db);
			try {
				var req = db.put({name: 'notes', keyPath: 'url'}, {url: key, data: request.models});
				req.done(function () {
					sendResponse({msg: 'saved'});
				});
				req.fail(function (e) {
					sendResponse({err: e});
				});
			} catch (e) {
				console.log(e);
			}
			
			/*var obj = {};
			obj[sender.tab.url] = request.models;
			chrome.storage.sync.set(obj, function () {
				sendResponse({msg: 'saved'});
			});*/
		} else if (request.crud == 'delete') {
			console.log('delete', request.models);
			var key = sender.tab.url;
			if(_.isEmpty(request.models)) {
				var req = db.remove({name: 'notes', keyPath: 'url'}, {url: key, data: request.models});
				req.done(function () {
					sendResponse({msg: 'saved'});
				});
				req.fail(function (e) {
					sendResponse({err: e});
				});
			} else {
				var req = db.put({name: 'notes', keyPath: 'url'}, {url: key, data: request.models});
				req.done(function () {
					sendResponse({msg: 'saved'});
				});
				req.fail(function (e) {
					sendResponse({err: e});
				});
			}
			
			/*var obj = {};
			obj[sender.tab.url] = request.models;
			chrome.storage.sync.set(obj, function () {
				sendResponse({msg: 'saved'});
			});*/
		}
		return true;
	});
	return {};
});