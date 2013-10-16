"use strict";
 
/**
 * App
 * The background EventManager module.
 * @author Richard Wålander
 */
define([
	"underscore"
], function(_) {
	var eventmanager;
	//make it a sigelton by using _.once
	var EventManager = _.once(function () {
		var _self = this;
		chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(request, sender);

			_(_self.listners).each(function (listner) {
				if(listner.event === request.event) listner.cb(request, sender, sendResponse);
			}, _self);
			
			return true;
		});
	});
	
	EventManager.prototype = {
		listners: [],
		on: function (event, cb) {
			this.listners.push({event: event, cb: cb});
		},
		off: function (event, cb) {
			_(this.listners).each(function (listner) {
				if(listner.event === event && listner.cb === cb) {
					this.listners.pop(listner);
				}
			}, this);
		},
		trigger: function (event, data, cb) {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {event: event, data: data}, function(response) {
					if(cb) cb(response);
				});
			});
		}
	};

	eventmanager = new EventManager();
	
	//return the instance not the class
	return {
		on: function (event, cb) {
			eventmanager.on(event, cb);
		},
		off: function (event, cb) {
			eventmanager.off(event, cb);
		},
		trigger: function (event, data, cb) {
			eventmanager.trigger(event, data, cb);
		}
	};
});