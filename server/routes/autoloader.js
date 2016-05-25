var AdminAutoloader = require('../admin-routes/autoloader');

class Autoloader extends AdminAutoloader {
	constructor () {
		super();
		this.path = __dirname;
	}

	loadRoutes(expressApp, options) {
		// If verbose
		var verbose = options.verbose;

		// Init Routes
		this.initRoutes();

		this.routes.forEach(function(name) {
			// Log module
			verbose && console.log('\n   %s:', name);

		})

	}
}

module.exports = Autoloader;