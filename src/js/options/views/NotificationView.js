"use strict";
 
/**
 * NotificationView
 * The NotificationView module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"backbone"
], function($, Backbone) {
	var NotificationView = Backbone.View.extend({
		initialize: function () {
			_.bindAll(this,
				'showNotification'
			);
			$(document).on('notification', this.showNotification);
		},
		showNotification: function (e, data) {
			console.log('showNotification', data);
			var $alert = $('<div class="alert alert-dismissable" style="display: none;"></div>');
			$alert.append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');

			if(data.error) {
				this.$el.append($alert.addClass('alert-danger').append(data.error.message));
			} else if(data.success) {
				this.$el.append($alert.addClass('alert-success').append(data.success.message));
			} else if(data.info) {
				this.$el.append($alert.addClass('alert-info').append(data.info.message));
			} else if(data.warning) {
				this.$el.append($alert.addClass('alert-warning').append(data.warning.message));
			}

			$alert.fadeIn('slow');

			if(!data.sticky) {
				setTimeout(function () {
					$alert.fadeOut('slow', function () {
						$alert.remove();
					});
				}, 5000);
			}

		}
	});
	return NotificationView;
});