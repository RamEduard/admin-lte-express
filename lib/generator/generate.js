var fs      = require('fs'),
    viewExt = require('../../app').get('view engine');

var dirCtrls = __dirname + '/../../controllers/',
    dirViews = __dirname + '/../../views/';
/**
 * Generate controller 
 */
exports.controller = function(name) {
	var dirCtrls     = dirCtrls + name + '/',
	    dirCtrlViews = dirViews + name;
	fs.mkdir(dir, function(err) {
		if (err) throw err;
		var dataFile = 'exports.prefix = "/' + name + '";\n';
		dataFile += '\nexports.name = "' + name + '";\n';
		dataFile += '\nexports.engine = "' + viewExt + '";\n';
		dataFile += '\nexports.before = function(request, response, next) {';
		dataFile += '\n  console.log("Before middleware")';
		dataFile += '\n  next()\n};';
		// Controller router files
		fs.writeFile(dirCtrls + 'index.js', '', function(err) {
			if (err) throw err;
			console.log('Controller saved: ' + dirCtrls + 'index.js\n');
		});
		// Views path
		fs.mkdir(dirCtrlViews, function(err) {
			if (err) throw err;
			console.log('Controller view created: ' + dirCtrlViews + '\n');
		});
	});
};
/**
 * Generate route 
 */
exports.route = function(ctrlFile, name, view, cb) {
	var oldData = fs.readFileSync(ctrlFile);
	var dataFile = '\nexports.' + name + ' = ';
	dataFile += 'function(request, response) {';
	dataFile += '\n  response.render("' + view + '", {';
	dataFile += '\n    title: "' + name + '"\n  })';
	dataFile += '\n};';

	fs.writeFile(ctrlFile, oldData + dataFile, function(err) {
		if (err) throw err;
		console.log('Route saved.');
		// Callback
		if (cb) cb();
	});
	var viewFile = dirViews + view + '.' + viewExt;
	this.view(viewFile);
};
/**
 * Generate view 
 */
exports.view = function(filename, cb) {
	fs.writeFile(filename, 'Hello World', function(err) {
		if (err) throw err;
		console.log('View saved: ' + filename + '\n');
		// Callback
		if (cb) cb();
	});
};

// CRUD Search array
var crudSearch = [/__crudName__/g, /__modelName__/g, /__viewExt__/g];

// CRUD views templates
var viewsTemplates = ['list', 'new', 'edit', 'show'];

/**
 * Generate CRUD 
 */
exports.crud = function(name) {
	var arrayName = name.split('crud-'),
	    crudName  = (arrayName.length > 1) ? name : 'crud-' + name,
	    modelName = (arrayName.length > 1) ? name : 'crud_' + name,
	    crudRep   = [crudName, modelName, viewExt],
	    dirCrud   = dirCtrls + crudName + '/',
	    crudViews = dirViews + crudName + '/',
	    dirTemps  = __dirname + '/templates/crud';

	// Create CRUD folder
	fs.mkdir(dirCrud, function(err) {
		if (err) throw err;

		// Content CRUD controller
		var ctrlBuffer  = fs.readFileSync(dirTemps + '/controller'),
        contentFile = getContentReplaced(ctrlBuffer, crudSearch, crudRep);

		// Write CRUD controller file
		fs.writeFile(dirCrud + 'index.js', contentFile, function(err) {
			if (err) throw err;
			console.log('CRUD saved: ' + dirCrud + 'index.js\n');
		});

		// Create CRUD views folder
		fs.mkdir(crudViews, function(err) {
			if (err) throw err;
			// Content views
			viewsTemplates.forEach(function(viewTemplate) {
				// Content for view file
				var viewBuffer  = fs.readFileSync(dirTemps + '/' + viewTemplate + '.' + viewExt),
				    contentFile = getContentReplaced(viewBuffer, crudSearch, crudRep),
				    viewFile    = crudViews + viewTemplate + '.' + viewExt;
				
				// Write CRUD view file
				fs.writeFile(viewFile, contentFile, function(err) {
					if (err) console.log('\nError: %s\nCreate file: %s\n\n%s', err.message, viewFile, contentFile);
					console.log('CRUD view created: ' + viewFile + '\n');
				});
			});
		});
	});
};

function getContentReplaced(buffer, search, replace) {
	var content = buffer.toString();
	if ((Array.isArray(search) && Array.isArray(replace)) && search.length === replace.length) {
		search.forEach(function(value, index) {
			content = content.replace(search[index], replace[index]);
		});
	} else {
		content = content.replace(search, replace);
	}
	return content;
}