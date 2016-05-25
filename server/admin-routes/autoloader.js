const fs = require('fs');

class Autoloader {

	constructor() {
		this.routes = [];
		this.path = __dirname;
	}

	initRoutes() {
		var routes = [];
		// get routes names
		fs.readdirSync(this.path).forEach(function(name) {
			if (name !== 'autoloader.js') {
				routes.push(
					name.split('.')[0]
				);
			}
		});

		this.routes = routes;
	}

	allRoutesNames() {
		this.initRoutes();

		var routes = [];

		this.routes.forEach(function(name) {
			routes.push('/' + name + '*');
		});

		return routes;
	}

	loadRoutes(expressApp, options) {
		// If verbose
		var verbose = options.verbose;

		this.routes.forEach(function(name) {
			// Log module
			verbose && console.log('\n   %s:', name);

			var obj = require('./' + name);
			var name = obj.name || name;
			var prefix = obj.prefix || '';
			var engine = obj.engine || 'handlebars';
			var before = obj.before || false;
			var method;
			var path;
			var routeName;

			// generate routes based
			// on the exported methods
			for (var key in obj) {
				// "reserved" exports
				if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
				// route exports
				switch (key) {
					case 'list':
						method = 'get';
						path = '/' + name + 's';
						break;
					case 'show':
						method = 'get';
						path = '/' + name + '/:_id';
						break;
					case 'new':
						method = 'get';
						path = '/' + name + '/new';
						break;
					case 'create':
						method = 'post';
						path = '/' + name;
						break;
					case 'edit':
						method = 'get';
						path = '/' + name + '/:_id/edit';
						break;
					case 'update':
						method = 'put';
						path = '/' + name + '/:_id';
						break;
					case 'remove':
						method = 'get';
						path = '/' + name + '/:_id/remove';
						break;
					case 'delete':
						method = 'delete';
						path = '/' + name + '/:_id';
						break;
					case 'index':
						method = 'get';
						path = (prefix === '') ? '/' : '';
						break;
					default:
						method = 'get';
						path = '/' + key;
				}

				path = prefix + path;
				routeName = name + '.' + key;

				if (before) {
					expressApp[method](path, routeName, before, obj[key]);
					verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), path, routeName);
				}
				else {
					expressApp[method](path, routeName, obj[key]);
					verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, routeName);
				}
			}
		});
	}
}

module.exports = Autoloader;