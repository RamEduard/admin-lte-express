exports.prefix = '/calendar';

////exports.before = function(request, response, next) { next() };

exports.index = function(request, response) {
  response.render("calendar/index", {
    title: "Calendar"
  })
};