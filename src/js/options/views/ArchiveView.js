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
			_.bindAll(this, 
				'render', 
				'export',
				'clear',
				'exportAll'
			);
			this.listenTo(this.collection, 'sync', this.render);
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'destroy', this.render);
			this.listenTo(this.collection, 'reset', this.render);
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
			'click .export': 'export',
			'click .clear': 'clear',
			'click .export-all': 'exportAll',
		},
		export: function (e) {
			var id = $(e.currentTarget).data('id');
			var model = this.collection.get(id);

			$('#modals').html('');
			$(this.modaltmpl({json: JSON.stringify(_.pick(model.toJSON(), 'url', 'data'))})).appendTo('#modals').modal({
				backdrop: true
			})
			.on('hide.bs.modal', function () {
				$('.modal-backdrop').remove();
			});
		},
		clear: function () {
			var conf = confirm('Are you sure you want to delete all notes. The data will be lost for ever!');
			if(conf) {
				this.collection.reset();
			}
		},
		exportAll: function () {
			var models = this.collection.toJSON();
			console.log(models);
			$('#modals').html('');
			$(this.modaltmpl({json: JSON.stringify(models)})).appendTo('#modals').modal({
				backdrop: true
			})
			.on('hide.bs.modal', function () {
				$('.modal-backdrop').remove();
			});
		}
	});
	return ArchiveView;
});