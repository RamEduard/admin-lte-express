var express      = require('express');
var handlebars   = require('express-handlebars');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var autoloader   = require('./autoloader');

var app = express();

// view engine setup
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/admin', express.static(path.join(__dirname, 'public')));

// Admin autoloader mvc
app.use(autoloader);

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
