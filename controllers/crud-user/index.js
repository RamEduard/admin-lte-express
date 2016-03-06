var db = require('../../db');

exports.prefix = "/crud";

exports.name = "user";

exports.engine = "handlebars";

exports.before = function(request, response, next) {
  var id = request.params._id;
  if (!id) return next();
  db.User.findOne({id:id}, function(err, user) {
    if (!user) return next('route');
    request.var_name = user;
    next();
  });
};

exports.index = function(request, response) {
  response.redirect('/crud/users');  
};

exports.list = function(request, response) {
  db.User.find().exec(function(err, results) {
    response.render("crud-user/list", { crud_user: results });
  });
};

exports.new = function(request, response) {
  response.render("crud-user/new");
};

exports.create = function(request, response) {
  var user = request.body.user;
  
  var User = new db.User({
    id: Math.floor(100000 + Math.random() * 900000).toString().substring(0, 4),
    username: user.username,
    password: user.password,
    displayName: user.displayName,
    emails: [{ value: user.email }]
  });

  // Save 
  User.save(function(err) {
    if (err) {
      request.session.error = err.message;
      reponse.redirect('back');
    }
    
    request.sesion.success = 'User created succesfuly!';
    response.redirect("/crud/user/" + var_name.id);
  });
};

exports.edit = function(request, response) {
  response.render("crud-user/edit", { crud_user: request.var_name });
};

exports.show = function(request, response) {
  response.render("crud-user/show", { crud_user: request.var_name });
};

exports.update = function(request, response) {
  var user = request.body.user;
  
  request.var_name.name = user.displayName;
  response.redirect("/crud/user/" + request.var_name.id);
};
