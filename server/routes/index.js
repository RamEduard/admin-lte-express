exports.prefix = '/';

//exports.before = function(request, response, next) { next() };

exports.index = function(request, response) {
  response.render("examples/react-store", {
    title: "Store ReactJS with Handlebars",
    layout: 'bootstrap-base'
  })
};
