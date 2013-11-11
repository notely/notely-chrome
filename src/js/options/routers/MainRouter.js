"use strict";
 
/**
 * MainRouter
 * The MainRouter module.
 * @author 
 */
define([
	"jquery",
	"ydn",
	"underscore",
	"backbone",
	"moment",
	"options/collections/PageCollection",
	"options/views/ArchiveView",
	"options/views/PageView",
	"options/views/ImportView"
], function($, ydn, _, Backbone, moment, PageCollection, ArchiveView, PageView, ImportView) {
	
	var schema = {
		stores: [{
			name: 'notes',
			keyPath: 'url', // optional, 
			autoIncrement: false, // optional. 
			indexes: [
				{
					keyPath: 'url'
				}, 
				{
					keyPath: 'data',
					multiEntry: true
				}
			] // optional, list of index schema as array.
		}]
	};
	var db = new ydn.db.Storage('NoTate', schema);

	var MainRouter = Backbone.Router.extend({
		initialize: function () {
			_.bindAll(this,
				'archive',
				'page',
				'help',
				'import'
			);

			this.pagecollection = new PageCollection();

			this.archiveview = new ArchiveView({el: '#archive', collection: this.pagecollection});
			this.pageview = new PageView({el: '#page', model: new Backbone.Model()});
			
			// this.importview = new ImportView({el: '#import', collection: this.archivecollection});
			this.importview = new ImportView({el: '#import', collection: this.pagecollection});

			// this.listenTo(this.pagecollection, 'sync', _.once(function () {
			// 	Backbone.history.start();
			// }));

			var req = this.pagecollection.fetch();

			$.when(req).then(function () {
				console.log('history.start');
				Backbone.history.start();
			});
			
		},
		routes: {
			"": "archive", 
			"help": "help", 
			"page/:cid": "page", 
			"import": "import" 
		},
		archive: function () {
			$('.panel').hide();
			$('#archive').show();
			$('.list-group-item').removeClass('active');
			$('.list-group-item.archive').addClass('active');
		},
		page: function (cid) {
			$('.panel').hide();
			$('#page').show();

			var model = this.pagecollection.get(cid);
			console.log('page', model);
			this.pageview.model = model;
			this.pageview.render();
		},
		help: function () {
			$('.panel').hide();
			$('#help').show();
			$('.list-group-item').removeClass('active');
			$('.list-group-item.help').addClass('active');
		},
		import: function () {
			$('.panel').hide();
			$('#import').show();
			$('.list-group-item').removeClass('active');
			$('.list-group-item.import').addClass('active');
		}
	});
	return MainRouter;
});