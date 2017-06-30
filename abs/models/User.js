var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		// validate: [validator.isAlphanumeric, "You can only use letters or numbers for the username."],
		required: "Please provide a username."
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		// validate: [validator.isEmail, "Invalid email address."],
		required: "Please provide an email address."
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);