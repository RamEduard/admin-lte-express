/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/25/16
 * Time: 10:10 AM
 */
var exphbs = require('express-handlebars');

/**
 * Active Route
 * @type {string}
 */
var activeRoute = '';

/**
 * Handlebars blocks
 * @type {Array}
 */
var blocks = [];

/**
 * [configActiveRoute]
 * @param expressApp
 */
function configActiveRoute(expressApp) {
    // Get named router
    var router = expressApp.get('router');

    if (router === undefined) {
        return;
    }

    expressApp.use(function(request, response, next) {
        var route = router.match(request)
        if (route) {
            activeRoute = route.route.options.name
        }
        next()
    });
}

/**
 * [configHandlebars]
 * @param expressApp
 */
function configHandlebars(expressApp, viewsPath) {
    var Handlebars = exphbs.create({
        defaultLayout: 'main',
        layoutsDir: viewsPath + '/layouts/',
        partialsDir: viewsPath + '/partials/',
        helpers: {
            url: function(routeName, params) {
                return expressApp.locals.url(routeName, params);
            },
            activeRoute: function(routeName) {
                return routeName === activeRoute ? 'active' : '';
            },
            activeRoutes: function(routeNames) {
                // TODO
                return routeNames.split(',').indexOf(activeRoute) >= 0 ? 'active' : '';
            },
            block: function(name) {
                var val = (blocks[name] || []).join('\n');

                // clear the block
                blocks[name] = [];
                return val;
            },
            extend: function(name, context) {
                var block = blocks[name];
                if (!block) {
                    block = blocks[name] = [];
                }

                block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
            }
        }
    });

    // View engine setup
    expressApp.engine('handlebars', Handlebars.engine);
    expressApp.set('view engine', 'handlebars');
    expressApp.set('views', viewsPath);
}

module.exports = (app, viewsPath) => {
    configActiveRoute(app);
    configHandlebars(app, viewsPath);
};