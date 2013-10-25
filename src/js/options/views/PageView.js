"use strict";
 
/**
 * PageView
 * The PageView module.
 * @author 
 */
define([
	"jquery",
	"underscore",
	"backbone",
	"moment"
], function($, _, Backbone, moment) {
	var PageView = Backbone.View.extend({
		template: Handlebars.templates.pagelistitem,
		initialize: function () {
			_.bindAll(this, 'render', 'delete');
			// this.listenTo(this.collection, 'reset', this.render);
			// this.listenTo(this.collection, 'remove', this.render);
			this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.find('tbody').html('');
			this.$el.find('.panel-heading > span').html('<strong>'+this.model.get('url')+'</strong> <a class="pull-right" target="_blank" href="'+this.model.get('url')+'">View Page</a>');
			this.model.get('data').each(function (model) {
				this.$el.find('tbody').append(this.template({
					time: moment(model.get('date')).fromNow(),
					no: this.model.get('data').indexOf(model)+1,
					content: model.get('content'),
					cid: model.cid
				}));
			}, this);
		},
		events: {
			'click .delete': 'delete'
		},
		delete: function (e) {
			var col = this.model.get('data');
			var model = col.get($(e.currentTarget).data('cid'));
			model.destroy();
			if(col.isEmpty()) {
				this.model.collection.trigger('destroy');
				this.model.destroy();
				location.hash = '#';
			} else {
				this.model.trigger('change', this.model);
				// this.model.collection.trigger('change');
			}
		}
	});
	return PageView;
});