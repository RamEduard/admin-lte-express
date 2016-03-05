var Generate = require('./generate')

// Arguments
var args = process.argv

if (~['crud', 'controller', 'route', 'view'].indexOf(args[2])) {
	switch(args[2]) {
		case 'crud':
			if (args[3]) {
				console.log('Generating CRUD...\n')
				Generate.crud(args[3])
			} else {
				console.log('\tcrud\n\t  --name\tName of CRUD. Ex.: pets, students, orders.\n')
			}
			break;
		case 'controller':
			if (args[3]) {
				console.log('Generating controller...\n')
				Generate.controller(args[3])
			} else {
				console.log('\tcontroller\n\t  --name\tName of controller. Ex.: ctrl-name, user_ctrl.\n')
			}
			break;
		case 'route':
			if (args[3] && args[4] && args[5]) {
				console.log('Generating route...\n')
				Generate.route(args[3], args[4], args[5])
			} else {
				console.log('\troute\n\t  --ctrlFile\tPath of controller JS file.\n\t  --name\tRoute name.\n\t  --view\tView to render.\n')
			}	
			break;
		case 'view':
			if (args[3]) {
				console.log('Generating view...\n')
				Generate.view(args[3])
			} else {
				console.log('\tview\n\t  --filename\tPath for view file.\n')
			}
			break;
	}
} else {
	console.log('\nValid options [controller|route|view]\n')
	console.log('\tcrud\n\t  --name\tName of CRUD. Ex.: pets, students, orders.\n')
	console.log('\tcontroller\n\t  --name\tName of controller. Ex.: ctrl-name, user_ctrl.\n')
	console.log('\troute\n\t  --ctrlFile\tPath of controller JS file.\n\t  --name\tRoute name.\n\t  --view\tView to render.\n')
	console.log('\tview\n\t  --filename\tPath for view file.\n')
}