"use strict";
 
/**
 * App
 * The ArchiveView module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"underscore",
	"backbone",
	"moment"
], function($, _, Backbone, moment) {
	var ArchiveView = Backbone.View.extend({
		template: Handlebars.templates.archivelistitem,
		modaltmpl: Handlebars.templates.exportmodal,
		initialize: function () {
			_.bindAll(this, 'render', 'export');
			this.listenTo(this.collection, 'sync', this.render);
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'destroy', this.render);
		},
		render: function () {
			this.$el.find('tbody').html('');
			this.collection.each(function (model) {
				this.$el.find('tbody').append(this.template({
					id: model.id,
					url: model.get('url'),
					no: this.collection.indexOf(model)+1,
					count: model.get('data').length
				}));
			}, this);
		},
		events: {
			'click .export': 'export'
		},
		export: function (e) {
			var id = $(e.currentTarget).data('id');
			var model = this.collection.get(id);

			$('#modals').html('');
			$(this.modaltmpl({json: JSON.stringify(_.pick(model.toJSON(), 'url', 'data'))})).appendTo('#modals').modal({
				backdrop: false
			});
		}
	});
	return ArchiveView;
});