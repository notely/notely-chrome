(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popuplistview'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<br>\n<div class=\"list-group\">\n	<a href=\"#\" class=\"list-group-item\">\n		<h4 class=\"list-group-item-heading\">Note 1, Thu 17 oct 2013, 09:32</h4>\n		<p class=\"list-group-item-text\">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>\n		<p class=\"clearfix\">\n			<button class=\"btn btn-default pull-right\"><i class=\"icon-trash\"></i></button>\n		</p>\n	</a>\n	<a href=\"#\" class=\"list-group-item\">\n		<h4 class=\"list-group-item-heading\">List group item heading</h4>\n		<p class=\"list-group-item-text\">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>\n	</a>\n</div>";
  });
})();