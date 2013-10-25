(function ($,_,Backbone,App,moment) {
	var NoTateView = 
	App.Views.NoTateView = 
	Backbone.View.extend({
		el: 'body',
		initialize: function () {
			_.bindAll(this,
				'render',
				'unrender',
				'newItem',
				'hideItems',
				'addNote'
			);
			// this.$el.on('click', this.newItem);
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'reset', this.render);
			this.on('notes.add', this.addNote);
		},
		render: function (model) {
			this.unrender();
			this.collection.each(function (model) {
				var note = new App.Views.NoteView({model: model});
				this.$el.append(note.render().$el);
			}, this);

			return this;
		},
		unrender: function () {
			this.$el.find('.notate-note').qtip('destroy');
			this.$el.find('.notate-note').remove();
		},
		newItem: function (e) {
			//if(e.shiftKey) {
				var model = new Backbone.Model({
					pageX: e.pageX - 12,
					pageY: e.pageY - 12,
					date: moment().format()
				});
				this.collection.add(model);
			//}
		},
		hideItems: function () {
			this.$el.find('.notate-note').hide();
		},
		showItems: function () {
			this.$el.find('.notate-note').show();
		},
		addNote: function () {
			this.$el.one('click', this.newItem);
		}
	});
})(jQuery, _, Backbone, App, moment);
	