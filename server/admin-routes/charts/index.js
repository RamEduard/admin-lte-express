exports.prefix = '/charts';

//exports.before = function(request, response, next) { next() };

exports.chartjs = function(request, response) {
  response.render("charts/chart-js", {
    title: "ChartJS"
  })
};
exports.morris = function(request, response) {
  response.render("charts/morris", {
    title: "Morris"
  })
};
exports.flot = function(request, response) {
  response.render("charts/flot", {
    title: "Flot"
  })
};
exports.inlineCharts = function(request, response) {
  response.render("charts/inline-charts", {
    title: "Inline Charts"
  })
};