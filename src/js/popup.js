require.config({
	"baseUrl": "js/",
	"paths": {
		"jquery": "lib/jquery",
		"backbone": "lib/backbone",
		"underscore": "lib/underscore",
		"ydn": "lib/ydn.db",
	},
	shim: {
		'underscore': {
			exports: '_'
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

require(['popup/App']);
