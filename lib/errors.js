/**
 * Error middlewares
 */

module.exports = function(parentApp) {
	// catch 404 and forward to error handler
	parentApp.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers
	parentApp.use(function(err, request, response, next) {
		var page, title, layout;
		
		if (request.session.user) {
			layout = 'main';
		} else {
			layout = 'auth'
		}
		if (err.status == 404) {
	      page = 'errors/404';
	      title = err.status + ' ' + err.message;
	    } else {
	      page = 'errors/500'
	      title = '500 Internal Server Error'
	    }

	    response.status(err.status || 500);

	    // development error handler
			// will print stacktrace
	    if (parentApp.get('env') !== 'development') err = {};

	    response.render(page, {
	      message: err.message,
	      error: err,
	      title: title,
	      layout: layout
	    });
	});
}