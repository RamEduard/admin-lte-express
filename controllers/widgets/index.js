exports.prefix = '/widgets'

//exports.before = function(request, response, next) { next() };

exports.index = function(request, response) {
  response.render("widgets/index", {
    title: "Widgets"
  })
};