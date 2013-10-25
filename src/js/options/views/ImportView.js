"use strict";
 
/**
 * PageView
 * The ImportView module.
 * @author 
 */
define([
	"jquery",
	"underscore",
	"backbone",
	"moment",
	"ydn",
	"utils/Util"
], function($, _, Backbone, moment, ydn, Util) {
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

	var ImportView = Backbone.View.extend({
		//template: Handlebars.templates.pagelistitem,
		initialize: function () {
			//this.listenTo(this.collection, 'reset', this.render);
		},
		render: function () {
			
		},
		events: {
			'click .import': 'import'
		},
		import: function () {
			try {
				var _self = this;
				var page = this.$el.find('#importarea').val();
				page = JSON.parse(page);
				console.log(page);
				if(!page.url && !page.data) {
					throw "wrong format";
				} else {
					db.get('notes', page.url)
					.done(function (model) {
						if(model) {
							throw "Notes for this page already exist";
						} else {
							db.put({name: 'notes', keyPath: 'url'}, page)
							.done(function () {
								console.log('saved');
								page.id = Util.hashCode(page.url);
								_self.collection.add(_self.collection.parse(page));
							})
							.fail(function (e) {
								alert(e);
							});
						}
					})
					.fail(function (e) {
						alert(e);
					});
				}
			} catch(e) {
				alert(e);
			}
			
		}
	});
	return ImportView;
});