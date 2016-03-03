exports.prefix = '/examples';

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