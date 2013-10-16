"use strict";
 
/**
 * PopUpView
 * The PopUpView module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"underscore",
	"backbone",
	"utils/EventManager"
], function($, _, Backbone, em) {
	var PopUpView = Backbone.View.extend({
		template: Handlebars.templates.popuptoolbar,
		initialize: function () {
			_.bindAll(this,
				'render'
			);
			this.render();
			this.$el.on('click', '#options', function () {
				var optionsUrl = chrome.extension.getURL('src/options.html');

				chrome.tabs.query({url: optionsUrl}, function(tabs) {
					if (tabs.length) {
						chrome.tabs.update(tabs[0].id, {active: true});
					} else {
						chrome.tabs.create({url: optionsUrl});
					}
				});	
			});
		},
		render: function () {
			console.log(this.template({}));
			this.$el.append(this.template({}));
			return this;
		},
		events: {
		 	'click #display': 'display',
		 	// 'click #options': 'options'
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
			em.trigger(event);
		},
		options: function () {
			
		}
	});
	return PopUpView;
});