exports.prefix = '/ui-elements';

//exports.before = function(request, response, next) { next() };

exports.general = function(request, response) {
  response.render("ui-elements/general", {
    title: "General"
  })
};
exports.icons = function(request, response) {
  response.render("ui-elements/icons", {
    title: "Icons"
  })
};
exports.buttons = function(request, response) {
  response.render("ui-elements/buttons", {
    title: "Buttons"
  })
};
exports.sliders = function(request, response) {
  response.render("ui-elements/sliders", {
    title: "Sliders"
  })
};
exports.timeline = function(request, response) {
  response.render("ui-elements/timeline", {
    title: "Timeline"
  })
};
exports.modals = function(request, response) {
  response.render("ui-elements/modals.handlebars", {
    title: "Modals"
  })
};