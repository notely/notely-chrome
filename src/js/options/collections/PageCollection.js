"use strict";
 
/**
 * PageCollection
 * The PageCollection module.
 * @author 
 */
define([
	"jquery",
	"underscore",
	"backbone",
	"backbonesync",
	"utils/Util"
], function($, _, Backbone, SyncManager, Util) {
	var PageCollection = Backbone.Collection.extend({
		url: '#',
		sync: SyncManager.pageSync,
		initialize: function () {
			_.bindAll(this, 'parse', 'delete', 'update');
			this.on('destroy', this.delete);
			this.on('change', this.update);
		},
		parse: function (res) {
			if(_.isArray(res)) {
				_(res).each(function (model) {
					model.id = Util.hashCode(model.url);
					model.data = new Backbone.Collection(model.data);
				}, this);
			} else {
				res.id = Util.hashCode(res.url);
				res.data = new Backbone.Collection(res.data);
			}
			
			return res;
		},
		delete: function (model) {
			if(model) this.sync('delete', _.clone(model.attributes));
		},
		update: function (model) {
			if(model) {
				var mod = _.clone(model.attributes);
				mod.data = mod.data.toJSON();
				this.sync('update', mod);
			}
		},
		toJSON: function () {
			return this.map(function(model){ 
				var ret = model.toJSON(options); 
				ret.data = ret.data.toJSON();
				return ret;
			});
		}
	});
	return PageCollection;
});