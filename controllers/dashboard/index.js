exports.prefix = '/dashboard';

exports.before = require('../../lib/auth').Auth.restrict;

exports.index = function(request, response) {
	response.render('dashboard/index', {
		title: 'Blank Page'
	});
};
exports.v1 = function(request, response) {
	response.render('dashboard/v1', {
		title: 'V1'
	});
};
exports.v2 = function(request, response) {
	response.render('dashboard/v2', {
		title: 'V2'
	});
};