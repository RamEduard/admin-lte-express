exports.prefix = '/documentation';

//exports.before = function(request, response, next) { next() };

exports.index = function(request, response) {
  response.render("documentation/index", {
    title: "Documentation",
    layout: false
  })
};