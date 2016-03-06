var passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    db       = require('../../db');

var Passport = exports.Passport = {};

Passport.load = function(parentApp) {
	// Configure the local strategy for use by Passport.
	//
	// The local strategy require a `verify` function which receives the credentials
	// (`username` and `password`) submitted by the user.  The function must verify
	// that the password is correct and then invoke `cb` with a user object, which
	// will be set at `req.user` in route handlers after authentication.
	passport.use(new Strategy(
	  function(username, password, cb) {
	    db.findByUsername(username, function(err, user) {
	      if (err) { return cb(err); }
	      if (!user) { return cb(null, false); }
	      if (user.password != password) { return cb(null, false); }
	      return cb(null, user);
	    });
	  }));


	// Configure Passport authenticated session persistence.
	//
	// In order to restore authentication state across HTTP requests, Passport needs
	// to serialize users into and deserialize users out of the session.  The
	// typical implementation of this is as simple as supplying the user ID when
	// serializing, and querying the user record by ID from the database when
	// deserializing.
	passport.serializeUser(function(user, cb) {
	  cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
	  db.findById(id, function (err, user) {
	    if (err) { return cb(err); }
	    cb(null, user);
	  });
	});

	parentApp.use(passport.initialize());
	parentApp.use(passport.session());

	// Define routes.
	parentApp.get('/login', 'login', function(req, res) {
    res.render('user/login', {
      title: 'Login',
      layout: 'auth'
    });
  });
	  
  parentApp.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    req.session.success = 'Authenticated as ' + req.user.displayName
    + ' click to <a href="/logout">logout</a>. '
    + ' You may now access <a href="' + parentApp.locals.url('dashboard.v1') + '">' + parentApp.locals.url('dashboard.v1') + '</a>.';
    res.redirect('/login');
  });

  parentApp.get('/logout', 'logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

	parentApp.get('/profile', 'profile', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
    res.render('profile', { user: req.user });
  });
};
