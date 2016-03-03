var mongoose = require('mongoose'),
	Schema   = mongoose.Schema

//mongoose.connect('mongodb://localhost:27017/admin-lte-express')

// Users Model
var usersSchema = new Schema({
	id: Number,
	name: String,
	password: String
}/*, {collection:'users'}*/);

module.exports.User = User = mongoose.model('User', usersSchema);

module.exports.getUsers = function(callback) {
	User.find().exec(function(err, users) {
		if (err) throw err

		callback(users)
	})
};

module.exports.users = users = []
