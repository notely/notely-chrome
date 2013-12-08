"use strict";

/**
 * PopUpView
 * The PopUpToolbarView module.
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
				'render',
				'edit',
				'display',
				'takeScreenShot',
				'capturePage'
				);
			this.render();
			this.canvas = document.createElement("canvas");
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
			this.$el.append(this.template({}));
			if(localStorage.getItem('shouldshow') === 'true') {
				this.$el.find('#display i').addClass('icon-eye-open').removeClass('icon-eye-close');
			} else {
				this.$el.find('#display i').addClass('icon-eye-close').removeClass('icon-eye-open');
			}
			this.$el.find('.btn').button();
			return this;
		},
		events: {
			'click #display': 'display',
			'click #edit': 'edit',
			'click #screenshot': 'takeScreenShot'
		},
		display: function () {
			console.log('display', localStorage);
			var event;
			if(localStorage.getItem('shouldshow') === 'true') {
				localStorage.setItem('shouldshow', 'false');
				this.$el.find('#display i').addClass('icon-eye-close').removeClass('icon-eye-open');
				event = 'notes.hide';
			} else {
				localStorage.setItem('shouldshow', 'true');
				this.$el.find('#display i').addClass('icon-eye-open').removeClass('icon-eye-close');
				event = 'notes.show';
			}

			em.trigger(event);
		},
		edit: function () {
			em.trigger('notes.add');
			window.close();
		},
		takeScreenShot: function () {
			this.$el.find('.icomoon-camera')
			.removeClass()
			.addClass('icon-spinner icon-spin');
			var _self = this;
			em.trigger('screenshot.start', null, function (data) {
				console.log(data);
				_self.canvas.height = data.docHeight;
				_self.canvas.width = data.docWidth;
				_self.capturePage(data.y);
				// chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(img) {
				// 	chrome.tabs.create({url: img});
				// });
			});
			
		},
		capturePage: function (y) {
			var _self = this;
			chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(data) {
				console.log('y', y);
				console.log(data);
				var image = new Image();
				image.onload = function() {
					var context = _self.canvas.getContext('2d');
					context.drawImage(image, 0, y);
					_self.captureNext()
				};
				image.src = data;
			});
		},
		captureNext: function () {
			var _self = this;
			em.trigger('screenshot.next', null, function (data) {
				console.log(data);
				if (data.next) {
					_self.capturePage(data.y);
				} else {
					_self.showScreenShot();
				}
				
			});
		},
		showScreenShot: function () {
			var img = this.canvas.toDataURL("image/png");
			img.substr(img.indexOf(',')+1).toString();
			img = img.replace(' ', '+');
			console.log(img);
			chrome.tabs.create({url: img});
		}
	});
	return PopUpView;
});