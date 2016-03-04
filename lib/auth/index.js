/**
 * Module dependencies.
 */
var hash = require('./pass').hash,
    db   = require('../../db');

var Auth = exports.Auth = {};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
db.users.forEach(function(user, index) {
  hash(user.password, function(err, salt, hash) {
    if (err) throw err;
    // store the salt & hash in the "db"
    db.users[index].salt = salt;
    db.users[index].hash = hash;
  });
});

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

Auth.load = function(parentApp, options) {
  var verbose = options.verbose;

  // Session-persisted message middleware

  parentApp.use(function(req, res, next){
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
  });

  parentApp.get('/restricted', 'restricted', Auth.restrict, function(req, res){
    res.redirect('/dashboard')
  });

  parentApp.get('/logout', 'logout', function(req, res){
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });

  parentApp.get('/register', 'register', function(req, res) {
    res.render('user/register', {
      title: 'Register',
      layout: 'auth'
    });
  });

  parentApp.get('/login', 'login',function(req, res){
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
          req.session.success = 'Authenticated as ' + user.name
            + ' click to <a href="/logout">logout</a>. '
            + ' You may now access <a href="/restricted">/restricted</a>.';
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
};
