var Sequelize = require('sequelize'),
 	config 	  = require('./env.config');

var database = new Sequelize(config.database.nameDB, config.database.userDB, config.database.passDB, {
  host: config.database.hostDB,
  dialect: config.database.dialect,
  port: config.database.portDB,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

database.sync();

module.exports = database;

