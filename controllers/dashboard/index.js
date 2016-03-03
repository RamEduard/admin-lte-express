exports.index = function(request, response) {
	response.render('dashboard/index', {
		title: 'Blank Page'
	});
};
exports.v1 = function(request, response) {
	response.render('dashboard/v1', {
		title: 'V1',
		layout: 'dashboard'
	});
};
exports.v2 = function(request, response) {
	response.render('dashboard/v2', {
		title: 'V2',
		layout: 'dashboard2'
	});
};