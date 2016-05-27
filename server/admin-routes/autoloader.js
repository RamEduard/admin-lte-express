'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var Autoloader = function () {
	function Autoloader() {
		_classCallCheck(this, Autoloader);

		this.routes = [];
		this.path = __dirname;
	}

	_createClass(Autoloader, [{
		key: 'initRoutes',
		value: function initRoutes() {
			var routes = [];
			// get routes names
			fs.readdirSync(this.path).forEach(function (name) {
				if (name !== 'autoloader.js') {
					routes.push(name.split('.')[0]);
				}
			});

			this.routes = routes;
		}
	}, {
		key: 'allRoutesNames',
		value: function allRoutesNames() {
			this.initRoutes();

			var routes = [];

			this.routes.forEach(function (name) {
				routes.push('/' + name + '*');
			});

			return routes;
		}
	}, {
		key: 'loadRoutes',
		value: function loadRoutes(expressApp, options) {
			// If verbose
			var verbose = options.verbose;

			this.routes.forEach(function (name) {
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
							path = prefix === '' ? '/' : '';
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
					} else {
						expressApp[method](path, routeName, obj[key]);
						verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, routeName);
					}
				}
			});
		}
	}]);

	return Autoloader;
}();

module.exports = Autoloader;