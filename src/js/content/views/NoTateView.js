(function ($,_,Backbone,App) {
	var NoTateView = 
	App.Views.NoTateView = 
	Backbone.View.extend({
		el: 'body',
		initialize: function () {
			_.bindAll(this,
				'render',
				'unrender',
				'newItem',
				'hideItems'
			);
			this.$el.on('click', this.newItem);
			this.collection.on('add', this.render);
			this.collection.on('reset', this.render);
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
})(jQuery, _, Backbone, App);
	