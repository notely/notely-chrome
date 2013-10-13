$(function () {
	if (!localStorage.checked) localStorage.checked = JSON.stringify([]);

	if(localStorage.checked === 'true') {
		$('#display').find('i').addClass('icon-eye-open').removeClass('icon-eye-close');
	} else {
		$('#display').find('i').addClass('icon-eye-close').removeClass('icon-eye-open');
	}

	$('#display').on('click', function () {
		console.log(localStorage['checked']);
		var event;
		if(localStorage['checked'] === 'true') {
			localStorage['checked'] = false;
			$(this).find('i').addClass('icon-eye-close').removeClass('icon-eye-open');
			event = 'notes.hide';
		} else {
			localStorage['checked'] = true;
			$(this).find('i').addClass('icon-eye-open').removeClass('icon-eye-close');
			event = 'notes.show';
		}
		
		console.log(localStorage['checked']);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {event: event}, function(response) {
				console.log(response);
			});
		});
	});

	$('#options').on('click', function () {
		var optionsUrl = chrome.extension.getURL('options.html');

		chrome.tabs.query({url: optionsUrl}, function(tabs) {
			if (tabs.length) {
				chrome.tabs.update(tabs[0].id, {active: true});
			} else {
				chrome.tabs.create({url: optionsUrl});
			}
		});
	});
});