require.config({
	"baseUrl": "js/",
	"paths": {
		"jquery": "lib/jquery",
		"backbone": "lib/backbone",
		"underscore": "lib/underscore",
		"bootstrap": "lib/bootstrap.min",
		"ydn": "lib/ydn.db",
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'ydn': {
			exports: 'ydn'
		}
	}
});

require(['bootstrap', 'popup/App']);
