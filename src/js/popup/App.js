"use strict";
 
/**
 * App
 * The popup App module.
 * @author Richard Wålander
 */
define([
	"jquery",
	"popup/views/PopUpView"
], function($, PopUpView) {
	$(function () {
		if (!localStorage.checked) localStorage.checked = JSON.stringify([]);

		if(localStorage.checked === 'true') {
			$('#display').find('i').addClass('icon-eye-open').removeClass('icon-eye-close');
		} else {
			$('#display').find('i').addClass('icon-eye-close').removeClass('icon-eye-open');
		}

		var popupview = new PopUpView({el: $('#content')});
		
	});
	return {};
});