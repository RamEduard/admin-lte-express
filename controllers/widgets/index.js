exports.prefix = '/widgets'

exports.before = require('../../lib/auth').Auth.restrict;

exports.index = function(request, response) {
  response.render("widgets/index", {
    title: "Widgets"
  })
};