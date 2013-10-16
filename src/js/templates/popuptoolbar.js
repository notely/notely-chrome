(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popuptoolbar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-group btn-group-justified\">\n	<a id=\"edit\" class=\"btn btn-default\">\n		<i class=\"icon-pencil\"></i>\n	</a>\n	<a id=\"display\" class=\"btn btn-default\">\n		<i class=\"icon-eye-close\"></i>\n	</a>\n	<a id=\"options\" class=\"btn btn-default\">\n		<i class=\"icon-cogs\"></i>\n	</a>\n</div>";
  });
})();