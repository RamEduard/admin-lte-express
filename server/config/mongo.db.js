var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    urlMLocal = 'mongodb://localhost:27017/admin-lte-express';

// Uncomment for use mongo database
mongoose.connect(urlMLocal, function(err) {
  if (err) console.log(err);
});

// Users Model
var usersSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  displayName: String,
  emails: Array
}, {collection:'users'});

var User = exports.User = mongoose.model('User', usersSchema);

exports.getUsers = function(cb) {
  User.find().exec(function(err, results) {
    cb(err, results);
  });
};

var users = exports.users = [
  new User({ 
    id: 1, 
    username: 'admin', 
    password: 'admin', 
    displayName: 'Jack', 
    emails: [ { value: 'jack@example.com' } ] 
  })]

// add users from collection mongo
this.getUsers(function(err, results) {
  if (err) throw err;
  results.forEach(function(user) {
    users.push(user);
  });
});

exports.findById = function(id, cb) {
  for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].id === id) {
      return cb(null, users[i]);
    }
  }
  return cb(new Error('User ' + id + ' does not exist'));
};

exports.findByUsername = function(username, cb) {
  for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].username === username) {
      return cb(null, users[i]);
    }
  }
  return cb(null, null);
};