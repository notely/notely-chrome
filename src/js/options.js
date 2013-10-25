require.config({
	"baseUrl": "js/",
	"paths": {
		"jquery": "lib/jquery",
		"backbone": "lib/backbone",
		"underscore": "lib/underscore",
		"bootstrap": "lib/bootstrap.min",
		"backbonesync": "lib/backbone.sync.amd",
		"ydn": "lib/ydn.db",
		"moment": "lib/moment-with-langs.min"
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

require(['bootstrap', 'options/App']);
