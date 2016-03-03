exports.prefix = '/mailbox';

exports.index = function(request, response) {
  response.render("mailbox/index", {
    title: "Mailbox"
  })
};
exports.compose = function(request, response) {
  response.render("mailbox/compose", {
    title: "Compose"
  })
};
exports.readMail = function(request, response) {
  response.render("mailbox/read-mail", {
    title: "Read Mail"
  })
};