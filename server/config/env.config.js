var config = {
  development: require('./environments/development.json'),
  production: require('./environments/production.json'),
  test: require('./environments/test.json')
};

module.exports = config[process.env.NODE_ENV || 'development'];
