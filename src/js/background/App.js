"use strict";
 
/**
 * App
 * The background App module.
 * @author Richard Wålander
 */
define([
	"ydn",
	"underscore",
	"utils/EventManager"
], function(ydn, _, em) {
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
	var shouldshow = localStorage.getItem('shouldshow');
	if(typeof shouldshow === 'undefined' || shouldshow == null) {
		localStorage.setItem('shouldshow', 'true');
	}
	// if (!localStorage.settings) localStorage.settings = JSON.stringify({});

	em.on('notes.read', function (request, sender, sendResponse) {
		db.get('notes', sender.tab.url)
		.done(function (models) {
			console.log('read', models.data);
			sendResponse({models: models.data});
		})
		.fail(function (e) {
			sendResponse({err: e});
		});
	});

	em.on('notes.create', function (request, sender, sendResponse) {
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
	});

	em.on('notes.delete', function (request, sender, sendResponse) {
		console.log('delete', request.models);
		var key = sender.tab.url;
		if(_.isEmpty(request.models)) {
			var req = db.remove('notes', key);
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
	});

	em.on('notes.shouldshow', function (request, sender, sendResponse) {
		console.log(localStorage.getItem('shouldshow'));
		sendResponse({shouldshow: localStorage.getItem('shouldshow')});
	});

	//refresh all tabs
	chrome.tabs.getAllInWindow(null, function(tabs){
		_(tabs).each(function (tab) {
			if(tab.url != 'chrome://extensions/' && tab.url != 'opera://extensions/') {
				chrome.tabs.reload(tab.id);
			}
		});
		// for (var i = 0; i < tabs.length; i++) {
		// 	chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });                         
		// }
	});

	return {};
});