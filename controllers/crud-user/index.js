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
    response.render("crud-user/list", {
      title: 'List Users',
      crud_user: results
    });
  });
};

exports.new = function(request, response) {
  response.render("crud-user/new", {
    title: 'New User'
  });
};

exports.create = function(request, response) {
  var user = request.body.user;
  
  if (user) {
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
      
      request.session.success = 'User created succesfuly!';
      response.redirect("/crud/user/" + User.id);
    });
  } else {
    response.redirect('/crud/users');
  }
};

exports.show = function(request, response) {
  response.render("crud-user/show", {
    title: 'Show User',
    crud_user: request.var_name 
  });
};

exports.edit = function(request, response) {
  response.render("crud-user/edit", {
    title: 'Edit User',
    crud_user: request.var_name 
  });
};

exports.update = function(request, response) {
  var user = request.body.user;
  
  request.var_name.displayName = user.displayName;

  db.User.findOneAndUpdate({_id: request.var_name._id}, request.var_name, function(err) {
    if (err) {
      request.session.error = 'Error updating delete user!';
    } else {
      request.session.success = 'User updated succesfuly!';
    }
  });

  response.redirect("/crud/user/" + request.var_name.id + "/edit");
};

exports.delete = function(request, response) {
  var result = '';

  db.User.findOneAndRemove({_id: request.var_name._id}, function(err) {
    if (err) {
      request.session.error = 'Error trying delete user!';
      result = err.message
    } else {
      request.session.success = 'User deleted succesfuly!';
      result = 'Deleted'
    }

    response.json({ result: result });
  });
};