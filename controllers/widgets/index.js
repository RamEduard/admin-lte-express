exports.prefix = '/widgets'

exports.index = function(request, response) {
  response.render("widgets/index", {
    title: "Widgets"
  })
};