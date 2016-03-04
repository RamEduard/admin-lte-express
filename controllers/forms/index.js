exports.prefix = '/forms';

//exports.before = require('../../lib/auth').Auth.restrict;

exports.general = function(request, response) {
  response.render("forms/general", {
    title: "General"
  })
};
exports.advanced = function(request, response) {
  response.render("forms/advanced", {
    title: "Advanced"
  })
};
exports.editors = function(request, response) {
  response.render("forms/editors", {
    title: "Editors"
  })
};