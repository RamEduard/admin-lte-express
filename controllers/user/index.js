exports.prefix = '/user';

exports.lockscreen = function(request, response) {
	response.render('lockscreen', {
		title: 'Lock Screen',
		layout: 'lockscreen'
	});
};
exports.login = function(request, response) {
	response.render('login', {
		title: 'Login',
		layout: 'auth'
	});
};
exports.register = function(request, response) {
	response.render('register', {
		title: 'Register',
		layout: 'auth'
	});
};
exports.profile = function(request, response) {
	response.render('profile', {
		title: 'Profile'
	});
};