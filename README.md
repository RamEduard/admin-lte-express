# admin-lte-express

AdminLTE 2.3.2 with express and express-handlebars.

**git clone**
https://github.com/RamEduard/admin-lte-express.git

## Generator
**./bin/generate**
Valid options [controller|route|view]

	controller
	  --name	Name of controller. Ex.: user

	route
	  --ctrlFile	Path of controller JS file.
	  --name	Route name.
	  --view	View to render.

	view
	  --filename	Path for view file.

## Helpers

* url(routeName, params) returns Path for the routeName
* activeRoute(routeName) returns ['active'||'']
* activeRoutes(routeNames) returns ['active'||'']
* block(name)
* extend(blockName, context)
	  
## TODO
* Authorization integrated to DB module.
* CRUD example
* Generator CRUD

## License
[**GPL-3.0**](https://github.com/RamEduard/admin-lte-express/blob/master/LICENSE.md)
