"use strict";
 
/**
 * App
 * The Options App module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"ydn",
	"backbonesync",
	"options/routers/MainRouter"
], function($, ydn, Backbone, MainRouter) {
	$(function () {
		var mainrouter = new MainRouter();
	});
	return {};
});