
var App = {
	Views: {},
	Models: {},
	Collections: {},
	EventManager: {
		on: function (event, cb, res) {
			chrome.runtime.onMessage.addListener(
				function(request, sender, sendResponse) {
					console.log(request, sender);

					if (request.event == event) {
						cb(request);
						if(res)
							sendResponse(res);
					} 
					return true;
				});
		},
		trigger: function (event, cb) {
			chrome.runtime.sendMessage({event: event}, function (response) {
				if(cb)
					cb(response);
			});
		}
	}
};

Backbone.sync = function (method, model) {
	console.log('sync', method, model, location);
	if(method == 'read') {
		chrome.runtime.sendMessage({crud: "read"}, function (response) {
			var models = JSON.parse(response.models);
			model.reset(models);
			console.log(model);
		});
	} else if (method == 'create') {
		chrome.runtime.sendMessage({
			crud: 'create',
			models: JSON.stringify(model.collection)
		}, function (res) {
			console.log(res);
		});
	} else if (method == 'delete') {
		var col = model.collection;
		col.remove(model);
		chrome.runtime.sendMessage({
			crud: 'delete',
			models: JSON.stringify(col)
		}, function (res) {
			console.log(res);
		});
	}
}

// ------------------------- Views -------------------------

App.Views.NoTateView = Backbone.View.extend({
	el: 'body',
	initialize: function () {
		_.bindAll(this,
			'render',
			'newItem',
			'hideItems'
		);
		this.$el.on('click', this.newItem);
		this.collection.on('add', this.render);
		this.collection.on('reset', this.render);
	},
	render: function (model) {
		this.$el.find('.notate-note').qtip('destroy');
		this.$el.find('.notate-note').remove();
		this.collection.each(function (model) {
			var note = new App.Views.NoteView({model: model});
			this.$el.append(note.render().$el);
		}, this);

		return this;
	},
	newItem: function (e) {
		if(e.shiftKey) {
			var model = new Backbone.Model({
				pageX: e.pageX - 12,
				pageY: e.pageY - 12
			});
			this.collection.add(model);
		}
	},
	hideItems: function () {
		this.$el.find('.notate-note').hide();
	},
	showItems: function () {
		this.$el.find('.notate-note').show();
	}
});

App.Views.NoteView = Backbone.View.extend({
	template: _.template('<span class="notate-note" style="top:<%= pageY %>px;left:<%= pageX %>px;"></span>'),
	notebox: _.template(
		'<div class="notate-notebox-content" contenteditable="true" style="">\
			<%= content %>\
		</div>\
		<div class="notate-notebox-footer" style="text-align: right;">\
			<button class="delete">Delete</button>\
		</div>'),
	initialize: function () {
		_.bindAll(this, 
			'render',
			'delete',
			'updateContent'
		);
	},
	render: function () {
		var _self = this;
		
		this.$el = $(this.template({
			pageX: this.model.get('pageX'),
			pageY: this.model.get('pageY')
		}));

		// var draggie = new Draggabilly(this.el);
		this.$el.draggable({
			 stop: function( event, ui ) {
			 	_self.model.set({
			 		pageX: event.pageX - 12,
			 		pageY: event.pageY - 12
			 	});
			 	_self.model.save();
			 }
		});

		this.$el.qtip({
			id: this.model.cid,
			content: {
				title: 'Edit Note',
				text: this.notebox({content: this.model.get('content')}),
				button: true
			},
			style: {
				classes: 'qtip-shadow'
			},
			position: {
			    at: 'bottom center',
			    viewport: $(window)
			},
			show: {
			    // ready: true
			    event: 'click'
			},
			hide: {
			    event: false,
			    fixed: true
			},
			events: {
				render: function (event, api) {
					$(api.elements.content).on('click', '.delete', _self.delete);
					$(api.elements.content).on('blur', '.notate-notebox-content', _self.updateContent);
				}
			}
		});
		return this;
	},
	delete: function () {
		this.$el.qtip('destroy');
		this.$el.remove();
		Backbone.sync('delete', this.model);
	},
	updateContent: function () {
		var content = this.$el.qtip('api').elements.content.find('.notate-notebox-content').html();
		this.model.set({content: content});
		this.model.save();
	}
});

// ------------------------- Models -------------------------

// ------------------------- Collections -------------------------

App.Collections.NotesCollection = Backbone.Collection.extend({
	initialize: function () {
		
	}
});

// ------------------------- init -------------------------


$(function () {
	if (!localStorage.displaynotes) localStorage.displaynotes = JSON.stringify([]);
	var notes,
		notateview;
	
	if(localStorage.displaynotes == 'true') {
		notes = new App.Collections.NotesCollection();
		notes.fetch();
		notateview = new App.Views.NoTateView({collection: notes});
	}
	
	App.EventManager.on('notes.show', function () {
		localStorage.displaynotes = true;
		notes = new App.Collections.NotesCollection();
		notes.fetch();
		notateview = new App.Views.NoTateView({collection: notes});
	});
	App.EventManager.on('notes.hide', function () {
		localStorage.displaynotes = false;
		location.reload(true);
	});
	/*chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(request, sender);

			if (request.action == "show") {
				notateview.showItems();
				sendResponse({msg: "done"});
			} else if (request.action == "hide") {
				notateview.hideItems();
				sendResponse({msg: "done"});
			}
			return true;
		});*/
});
