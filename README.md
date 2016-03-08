# admin-lte-express

AdminLTE 2.3.2 with express and express-handlebars.

**Dashboard V1**
<img src="https://raw.githubusercontent.com/RamEduard/admin-lte-express/master/public/readme/dashboard.v1.png">
**Dashboard V2**
<img src="https://raw.githubusercontent.com/RamEduard/admin-lte-express/master/public/readme/dashboard.v2.png">
**Dashboard Login**
<img src="https://raw.githubusercontent.com/RamEduard/admin-lte-express/master/public/readme/login.png">
**Dashboard Register**
<img src="https://raw.githubusercontent.com/RamEduard/admin-lte-express/master/public/readme/register.png">

**git clone** (Recomended)
https://github.com/RamEduard/admin-lte-express.git

## Install 

npm install admin-lte-express --save

## Config on Express App

```js
app.use('/admin', express.static('./node_modules/admin-lte-express/public'))
app.use('/', require('admin-lte-express'));
```

## Generator
**./bin/generate**
Valid options [crud|controller|route|view]
 
	crud
	  --name	Name of CRUD. Ex.: crud-user

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

## Authorization

* Passport.js 
  - Uncomment Lines 72 and 73 for use this auth.
* Custom Auth express.js (Default)
  - Uncomment Lines 76 and 77 for use this auth.
	  
## TODO

* Authorization with Facebook and Google with Passport.js

## License
[**GPL-3.0**](https://github.com/RamEduard/admin-lte-express/blob/master/LICENSE.md)
