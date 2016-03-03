exports.prefix = '/examples';

exports.before = require('../../lib/auth').Auth.restrict;

exports.invoice = function(request, response) {
  response.render("examples/invoice", {
    title: "Invoice"
  })
};
exports.invoicePrint = function(request, response) {
  response.render("examples/invoice-print", {
    title: "Invoice Print",
    layout: false
  })
};