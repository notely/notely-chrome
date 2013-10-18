"use strict";
 
/**
 * App
 * The popup App module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"ydn",
	"popup/views/PopUpToolbarView",
	"popup/views/PopUpListView",
	"utils/EventManager"
], function($, ydn, PopUpToolbarView, PopUpListView, em) {
	$(function () {
		var db = new ydn.db.Storage('NoTate'),
			popuptoolbar,
			notes,
			popuplist;

		popuptoolbar = new PopUpToolbarView({el: $('#toolbar')});
		notes = new Backbone.Collection();
		popuplist = new PopUpListView({el: $('#list'), collection: notes});
		
		notes.on('remove', function (note) {
			console.log(note.collection);
			var key = note.collection.url;
			if(_.isEmpty(note.collection.models)) {
				db.remove('notes', key)
				.done(function () {
					em.trigger('notes.reload');
				})
				.fail(function (e) {
					console.log(e);
				});
			} else {
				db.put({name: 'notes', keyPath: 'url'}, {url: key, data: note.collection.toJSON()})
				.done(function () {
					em.trigger('notes.reload');
				})
				.fail(function (e) {
					console.log(e);
				});
			}
		});
		
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs[0].url);
			notes.url = tabs[0].url;
			db.get('notes', tabs[0].url)
			.done(function (models) {
				notes.reset(models.data);
			})
			.fail(function (e) {
				console.log(e);
			});
		});

		
	});
	return {};
});