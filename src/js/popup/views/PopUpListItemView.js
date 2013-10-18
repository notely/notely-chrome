"use strict";
 
/**
 * PopUpView
 * The PopUpListItemView module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"underscore",
	"backbone",
	"moment"
], function($, _, Backbone, moment) {
	var PopUpListItemView = Backbone.View.extend({
		tagName: 'a',
		className: 'list-group-item',
		template: Handlebars.templates.popuplistitem,
		initialize: function () {
			_.bindAll(this,
				'render',
				'delete'
			);
			this.render();
		},
		render: function () {
			var torender = _.clone(this.model.toJSON());
			torender.nr = this.model.collection.indexOf(this.model) + 1;
			torender.date = moment(torender.date).fromNow();
			this.$el.html(this.template(torender));
			return this;
		},
		events: {
		 	'click .delete': 'delete'
		},
		delete: function () {
			this.model.collection.remove(this.model);
		}
	});
	return PopUpListItemView;
});