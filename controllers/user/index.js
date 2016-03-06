exports.prefix = '/user';

//exports.before = function(request, response, next) { next() };

exports.lockscreen = function(request, response) {
	response.render('user/lockscreen', {
		title: 'Lock Screen',
		layout: 'lockscreen'
	});
};
exports.login = function(request, response) {
	response.render('user/login', {
		title: 'Login',
		layout: 'auth'
	});
};
exports.register = function(request, response) {
	response.render('user/register', {
		title: 'Register',
		layout: 'auth'
	});
};
exports.profile = function(request, response) {
	response.render('user/profile', {
		title: 'Profile'
	});
};