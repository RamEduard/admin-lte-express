/**
 * Module dependencies.
 */
var hash = require('./pass').hash,
    db   = require('../../config/mongo.db');

var Auth = exports.Auth = {};

Auth.authenticate = function(username, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', username, pass);
  db.findByUsername(username, function(err, user) {
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash(pass, user.salt, function(err, hash){
      if (err) return fn(err);
      if (hash == user.hash) return fn(null, user);
      fn(new Error('invalid password'));
    });
  });
}

Auth.restrict = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

Auth.loadRoutes = function(parentApp) {

  // when you create a user, generate a salt
  // and hash the password ('foobar' is the pass here)
  var criptUsers = function(req, res, next) {
    db.users.forEach(function(user, index) {
      hash(user.password, function(err, salt, hash) {
        if (err) throw err;
        // store the salt & hash in the "db"
        db.users[index].salt = salt;
        db.users[index].hash = hash;
      });
    });
    next();
  };

  parentApp.get('/logout', 'logout', function(req, res){
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
 
  parentApp.get('/login', 'login', criptUsers, function(req, res) {
    res.render('user/login', {
      title: 'Login',
      layout: 'auth'
    });
  });

  parentApp.post('/login', function(req, res){
    Auth.authenticate(req.body.username, req.body.password, function(err, user){
      if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function(){
          // Store the user's primary key
          // in the session store to be retrieved,
          // or in this case the entire user object
          req.session.user = user;
          req.session.success = 'Authenticated as ' + user.displayName
            + ' click to <a href="/logout">logout</a>. '
            + ' You may now access <a href="' + parentApp.locals.url('dashboard.v1') + '">' + parentApp.locals.url('dashboard.v1') + '</a>.';
          res.redirect('/login');
        });
      } else {
        req.session.error = 'Authentication failed, please check your '
          + ' username and password.'
          + ' (use "admin" and "admin")';
        res.redirect('/login');
      }
    });
  });

  // Register route
  parentApp.get('/register', 'register', function(req, res) {
    res.render( 'user/register', {
      title: 'Register',
      layout: 'auth'
    });
  });
  parentApp.post('/register', function(req, res) {
    var body = req.body;
    if (body.user) {
      var User = new db.User({
        id: Math.floor(100000 + Math.random() * 900000).toString().substring(0,4),
        username: body.user.username,
        password: body.user.password,
        displayName: body.user.name,
        emails: [{value: body.user.email}]
      });
      User.save(function(err) {
        if (err) req.session.error = err.message;
        else req.session.success = 'User saved successfuly!';
        res.redirect('/register');
      });
    } else {
      res.redirect('/register');
    }
  });
};
