(function ($, App) {
	$(function () {
		var notes,
			em,
			notateview;
			

		em = new App.Utils.EventManager();

		em.trigger('notes.shouldshow', null, function (res) {
			console.log('notes.shouldshow', res);
			
			if(res.shouldshow === 'true') {
				notes = new App.Collections.Notes();
				notes.fetch();
				notateview = new App.Views.NoTateView({collection: notes, show: true});
			}
		});

		em.on('notes.show', function () {
			// notes.fetch();
			location.reload(true);
		});
		
		em.on('notes.hide', function () {
			// notateview.unrender();
			location.reload(true);
		});
	});
})(jQuery, App);
