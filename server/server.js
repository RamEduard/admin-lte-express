var express      = require('express');
var session      = require('express-session');
var path         = require('path');
var methodOver   = require('method-override');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var Router       = require('named-routes');
var SECRET_KEY   = require('./config/env.config').secret_key;
var Handlebars   = require('./config/handlebars.config');
var Errors       = require('./errors');
var app          = express();

// Config named routes
var router = new Router();
router.extendExpress(app);
router.registerAppHelpers(app);

// Config session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: SECRET_KEY
}));

// Morgarn logger
app.use(logger('dev'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow overriding methods in query (?_method=put)
app.use(methodOver('_method'));

// Cookie parser
app.use(cookieParser());

// Public assets
app.use('/admin', express.static(path.join(__dirname, '../public')));

// Session-persisted message middleware
app.use(function(req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

var adminLoader = require('./admin-routes/autoloader'),
    AdminLoader = new adminLoader(),
    AuthLoader  = require('./lib/auth').Auth;

// Authorization
AuthLoader.loadRoutes(app);
// Routes for AUTH_BEFORE
app.use(AdminLoader.allRoutesNames(), AuthLoader.restrict);

// If there are routes will be load it
AdminLoader.loadRoutes(app, {
    verbose: (process.env.NODE_ENV !== 'production')
});

var routesLoader = require('./routes/autoloader'),
    RoutesLoader = new routesLoader();

RoutesLoader.loadRoutes(app, {
    verbose: (process.env.NODE_ENV !== 'production')
});

// Config Handlebars
Handlebars(app, __dirname + '/views');

// Errors handler
Errors(app);

// Set router
app.set('router', router);

module.exports = app;
