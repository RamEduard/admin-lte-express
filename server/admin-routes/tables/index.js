exports.prefix = '/tables';

//exports.before = function(request, response, next) { next() };

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