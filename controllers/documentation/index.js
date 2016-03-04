exports.prefix = '/documentation';

//exports.before = require('../../lib/auth').Auth.restrict;

exports.index = function(request, response) {
  response.render("documentation/index", {
    title: "Documentation",
    layout: false
  })
};