(function (Backbone, App) {
	var NoteView =
	App.Views.NoteView =
	Backbone.View.extend({
		template: _.template('<span class="notate-note" style="top:<%= pageY %>px;left:<%= pageX %>px; position: absolute;"></span>'),
		notebox: _.template(
			'<div class="notate-notebox-content" contenteditable="true" style="">\
				<%= content %>\
			</div>\
			<div class="notate-notebox-footer" style="text-align: right;">\
				<button class="delete"><i class="noticon-trash"></i> Delete</button>\
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
					classes: 'qtip-shadow qtip-rounded',
					tip: {
						mimic: 'center',
						offset: 10
					}
				},
				position: {
				    at: 'bottom center',
				    viewport: $(window),
					adjust: {
						x: -5
					}
				},
				show: {
				    ready: true,
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
					},
					show: function (event, api) {
						$(api.elements.content).find('.notate-notebox-content').get(0).focus();
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
})(Backbone, App);