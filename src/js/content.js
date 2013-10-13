(function ($, App) {
	$(function () {
		var notes,
			eventmanager,
			notateview;
		
		if(localStorage.displaynotes == 'true') {
			notes = new App.Collections.Notes();
			notes.fetch();
			notateview = new App.Views.NoTateView({collection: notes});
		}

		eventmanager = new App.Utils.EventManager();

		eventmanager.on('notes.show', function () {
			localStorage.displaynotes = true;
			notes = new App.Collections.Notes();
			notes.fetch();
			notateview = new App.Views.NoTateView({collection: notes});
		});
		eventmanager.on('notes.hide', function () {
			localStorage.displaynotes = false;
			location.reload(true);
		});
	});
})(jQuery, App);
