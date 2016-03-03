exports.prefix = '/documentation';

exports.index = function(request, response) {
  response.render("documentation/index", {
    title: "Documentation",
    layout: false
  })
};