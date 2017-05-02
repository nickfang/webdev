var mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
	firstName: 		String,
	lastName: 		String,
	gender: 			String,
	birthday: 		String,
	city: 			String,
	state: 			String,
	headShots:  	[String],
	emails:  		[String],
	phonenumbers: [
		{
			type: String,
			phonenumber: String
		}
	],
	ethnicities:  	[String],
	skills:  		[String],
	socialMedia:  	String,
	unionMembership: [String],  // TODO:array of enums?
	representation: String,	// may need to make another table for this to include contact information.
	filmography:   [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role"
		}
	]
});

module.exports = mongoose.model("Profile", profileSchema);

// TODO: use https://docs.mongodb.com/manual/core/gridfs/ for images
// TODO: would it be easier to anonomize if information was broken out to multiple tables.