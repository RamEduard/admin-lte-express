var express      = require('express');
var exphbs       = require('express-handlebars');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var Router       = require('named-routes');
var Autoloader   = require('./lib/autoloader');

// Main App
var app = express();
// Config named routes
var router = new Router();
router.extendExpress(app);
router.registerAppHelpers(app);
// MVC Autoloader
Autoloader(app, {verbose: module.parent});
// Config Handlebars
var blocks = {};
var Handlebars = exphbs.create({
  defaultLayout: 'main',
  helpers      : {
    url: function(routeName, params) {
      return app.locals.url(routeName, params);
    },
    urlActive: function(routeName) {
      // TODO
      return true;
    },
    block: function(name) {
      var val = (blocks[name] || []).join('\n');

      // clear the block
      blocks[name] = [];
      return val;
    },
    extend: function(name, context) {
      var block = blocks[name];
      if (!block) {
          block = blocks[name] = [];
      }

      block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
    }
  }
});
// View engine setup
app.engine('handlebars', Handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/admin', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var page, title;
    if (err.status == 404) {
      page = 'errors/404';
      title = err.status + ' ' + err.message;
    }
    else {
      page = 'errors/500'
      title = '500 Internal Server Error'
    }

    res.status(err.status || 500);
    res.render(page, {
      message: err.message,
      error: err,
      title: title
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var page, title;
  if (err.status == 404) {
    page = 'errors/404';
    title = err.status + ' ' + err.message;
  }
  else {
    page = 'errors/500'
    title = '500 Internal Server Error'
  }

  res.status(err.status || 500);
  res.render(page, {
    message: err.message,
    error: {},
    title: title
  });
});


module.exports = app;
