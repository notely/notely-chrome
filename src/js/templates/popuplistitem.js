(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popuplistitem'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h4 class=\"list-group-item-heading\">Note ";
  if (stack1 = helpers.nr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ", ";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n<p class=\"list-group-item-text\">";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n<p class=\"clearfix\">\n	<button class=\"delete btn btn-sm btn-default pull-right\"><i class=\"icon-trash\"></i></button>\n</p>";
  return buffer;
  });
})();