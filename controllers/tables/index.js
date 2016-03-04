exports.prefix = '/tables';

//exports.before = require('../../lib/auth').Auth.restrict;

exports.simple = function(request, response) {
  response.render("tables/simple", {
    title: "Simple"
  })
};
exports.dataTables = function(request, response) {
  response.render("tables/data-tables", {
    title: "Data Tables"
  })
};