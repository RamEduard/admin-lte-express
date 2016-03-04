exports.prefix = '/calendar';

////exports.before = require('../../lib/auth').Auth.restrict;

exports.index = function(request, response) {
  response.render("calendar/index", {
    title: "Calendar"
  })
};