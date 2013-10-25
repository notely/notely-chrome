"use strict";
 
/**
 * PopUpView
 * The PopUpListView module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"underscore",
	"backbone",
	"popup/views/PopUpListItemView"
], function($, _, Backbone, PopUpListItemView) {
	var PopUpListView = Backbone.View.extend({
		// template: Handlebars.templates.popuplistview,
		className: 'list-group',
		initialize: function () {
			_.bindAll(this,
				'render'
			);
			this.render();
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'remove', this.render);
			//this.collection.on('add', this.render);
		},
		render: function () {
			this.$el.html('');
			this.collection.each(function (model) {
				var listitem = new PopUpListItemView({model: model});
				this.$el.append(listitem.$el);
			}, this);
			return this;
		},
		events: {
		 	
		}
	});
	return PopUpListView;
});