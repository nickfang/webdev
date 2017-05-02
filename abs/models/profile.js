var mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
	firstName: 		String,
	lastName: 		String,
	gender: 			String,
	birthday: 		String,
	city: 			String,
	state: 			String,
	filmography:   [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role"
		}
	]
});

module.exports = mongoose.model("Profile", profileSchema);