(function ($, App) {
	$(function () {
		$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL('src/css/jquery.qtip.min.css') + '">');
		$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL('src/css/notate.css') + '">');
		
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

		em.on('notes.reload', function () {
			location.reload(true);
		}); 
		
		em.on('notes.add', function () {
			notateview.trigger('notes.add');
		});
	});
})(jQuery, App);
