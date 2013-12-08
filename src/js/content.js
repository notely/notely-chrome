(function($, App) {
	$(function() {
		$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL('src/css/jquery.qtip.min.css') + '">');
		$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL('src/css/notate.css') + '">');

		var notes,
			em,
			$fixedItems,
			notateview;

		$fixedItems = $('*').filter(function() {
			return $(this).css("position") === 'fixed';
		});

		em = new App.Utils.EventManager();

		em.trigger('notes.shouldshow', null, function(res) {
			console.log('notes.shouldshow', res);

			if (res.shouldshow === 'true') {
				notes = new App.Collections.Notes();
				notes.fetch();
				notateview = new App.Views.NoTateView({
					collection: notes,
					show: true
				});
			}
		});

		em.on('notes.show', function() {
			// notes.fetch();
			location.reload(true);
		});

		em.on('notes.hide', function() {
			// notateview.unrender();
			location.reload(true);
		});

		em.on('notes.reload', function() {
			location.reload(true);
		});

		em.on('notes.add', function() {
			notateview.trigger('notes.add');
		});

		// em.on('screenshot.start', function(data, sender, callback) {
		// 	$('html, body')
		// 	.animate({
		// 		scrollTop: 0
		// 	}, 0, function() {
		// 		callback({
		// 			docHeight: $(document).height(),
		// 			docWidth: $(document).width(),
		// 			winHeight: $(window).height(),
		// 			winWidth: $(window).width(),
		// 			next: true,
		// 			y: 0
		// 		});
		// 	});

		// });

		em.on('screenshot.start', function(data, sender, callback) {
			window.scrollTo();
			var data = {
				docHeight: $(document).height(),
				docWidth: $(document).width(),
				winHeight: $(window).height(),
				winWidth: $(window).width(),
				next: true,
				y: 0
			};
			console.log(data);
			setTimeout(function () {
				callback(data);
			}, 250);

		});

		// em.on('screenshot.next', function(data, sender, callback) {
		// 	console.log($(window).scrollTop() + $(window).height(), $(document).height());
		// 	if ($(window).scrollTop() + $(window).height() < $(document).height()) {
		// 		$('html, body')
		// 		.animate({
		// 			scrollTop: $(window).scrollTop() + $(window).height()
		// 		}, 50, function() {
		// 			console.log($(window).scrollTop());
		// 			callback({
		// 				next: true,
		// 				y: $(window).scrollTop()
		// 			});
		// 		});
		// 	} else {
		// 		console.log('stop');
		// 		callback({
		// 			next: false
		// 		})
		// 	}

		// });

		em.on('screenshot.next', function(data, sender, callback) {
			console.log('scrollY', window.scrollY);
			var body = document.body;
    		var docElement = document.documentElement;
			if (docElement.clientHeight + body.scrollTop != body.scrollHeight) {
				// $fixedItems.hide();
				// $fixedItems.css('position' , 'absolute');
				window.scrollBy(0, $(window).height());
				setTimeout(function () {
					callback({
						next: true,
						y: window.scrollY
					});
				}, 250);
			} else {
				console.log('stop');
				// $fixedItems.css('position' , 'fixed');
				// $fixedItems.show();
				setTimeout(function () {
					callback({
						next: false
					});
				}, 250);
			}

		});
	});
})(jQuery, App);