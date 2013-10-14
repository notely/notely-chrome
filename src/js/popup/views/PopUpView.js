"use strict";
 
/**
 * PopUpView
 * The PopUpView module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone) {
	var PopUpView = Backbone.View.extend({
		template: _.template($('#toolbar-tmpl').html()),
		id: '#content',
		initialize: function () {
			this.render();
		},
		render: function () {
			_.bindAll(this,
				'display',
				'options'
			);
			this.$el.append(this.tempalte({}));
			return this;
		},
		events: {
			'click #display': 'display',
			'click #options': 'options'
		},
		display: function () {
			console.log(localStorage['checked']);
			var event;
			if(localStorage['checked'] === 'true') {
				localStorage['checked'] = false;
				$(this).find('i').addClass('icon-eye-close').removeClass('icon-eye-open');
				event = 'notes.hide';
			} else {
				localStorage['checked'] = true;
				$(this).find('i').addClass('icon-eye-open').removeClass('icon-eye-close');
				event = 'notes.show';
			}
			
			console.log(localStorage['checked']);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {event: event}, function(response) {
					console.log(response);
				});
			});
		},
		options: function () {
			var optionsUrl = chrome.extension.getURL('src/options.html');

			chrome.tabs.query({url: optionsUrl}, function(tabs) {
				if (tabs.length) {
					chrome.tabs.update(tabs[0].id, {active: true});
				} else {
					chrome.tabs.create({url: optionsUrl});
				}
			});
		}
	});
	return PopUpView;
});