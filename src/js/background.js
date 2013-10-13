require.config({
	"baseUrl": "js/",
	"paths": {
		"jquery": "lib/jquery",
		"backbone": "lib/backbone",
		"underscore": "lib/underscore"
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['background/App']);
