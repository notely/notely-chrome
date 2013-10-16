"use strict";
 
/**
 * PopUpView
 * The PopUpView module.
 * @author Richard Wålander
 */
define([], function() {
	
	return {
		tmpl: function(tmpl, o) {
			return tmpl.replace(/<%=(?:"([^"]*)"|(.*?))%>/g, function (item, qparam, param) {
		        return o[qparam] || o[param];
		    });
		}
	};
});

