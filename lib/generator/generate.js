var fs      = require('fs'),
    viewExt = require('../../app').get('view engine')
/**
 * Generate controller 
 */
exports.controller = function(name) {
	var dir   = __dirname + '/../../controllers/' + name + '/';
	var views = __dirname + '/../../views/' + name;
	fs.mkdir(dir, function(err) {
		if (err) throw err;
		var dataFile = 'exports.prefix = "";\n';
		dataFile += '\nexports.name = "' + name + '";\n';
		dataFile += '\nexports.engine = "' + viewExt + '";\n';
		dataFile += '\nexports.before = function(request, response, next) {';
		dataFile += '\n  console.log("Before middleware")';
		dataFile += '\n};'
		// Controller router files
		fs.writeFile(dir + 'index.js', '', function(err) {
			if (err) throw err;
			console.log('Controller saved: ' + dir + 'index.js\n')
		})
		// Views path
		fs.mkdir(views, function(err) {
			if (err) throw err;
			console.log('Controller views created: ' + views + '\n')
		})
	})
};
/**
 * Generate route 
 */
exports.route = function(ctrlFile, name, view) {
	var oldData = fs.readFileSync(ctrlFile);
	var dataFile = '\nexports.' + name + ' = ';
	dataFile += 'function(request, response) {';
	dataFile += '\n  response.render("' + view + '", {';
	dataFile += '\n    title: "' + name + '"\n  })';
	dataFile += '\n};'

	fs.writeFile(ctrlFile, oldData + dataFile, function(err) {
		if (err) throw err;
		console.log('Route saved.')
	})
	var viewFile = __dirname + '/../../views/' + view + '.' + viewExt;
	this.view(viewFile);
};
/**
 * Generate view 
 */
exports.view = function(filename) {
	fs.writeFile(filename, 'Hello World', function(err) {
		if (err) throw err;
		console.log('View saved: ' + filename + '\n')	
	})
};
