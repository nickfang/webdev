var mongoose = require("mongoose");
<<<<<<< HEAD
var passportLocalMongoose = require("passport-local-mongoose");
=======
>>>>>>> ac42ad67103e05322f09d585bf90159cac380b16

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

<<<<<<< HEAD
userSchema.plugin(passportLocalMongoose);

=======
>>>>>>> ac42ad67103e05322f09d585bf90159cac380b16
module.exports = mongoose.model("User", userSchema);