exports.prefix = '/calendar';

exports.index = function(request, response) {
  response.render("calendar/index", {
    title: "Calendar"
  })
};