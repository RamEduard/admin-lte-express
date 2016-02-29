exports.index = function(request, response) {
	response.render('index', {
		title: 'Dashboard'
	})
}