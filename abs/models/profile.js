var mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
	firstName: 		String,
	lastName: 		String,
	gender: 			String,
	birthday: 		String,
	city: 			String,
	state: 			String,
	zip:  			String,
	ethnicities:  	[String],
	skills:  		[String],
	filmography:   [String], // TODO: create model to store film information.
	phonenumbers: [
		{
			phonenumber: String,
			type: String
		}
	],
	emails:  		[String],
	headShots:  	[String],


	socialMedia:  	[String], // TODO: create model to store social media information {socialMediaName: "name", socialMediaPlatform: "namePlatform"}
	representation: [String],	// may need to make another table for this to include contact information.
	unionMembership: [String]  // TODO:array of enums?
});

module.exports = mongoose.model("Profile", profileSchema);

// TODO: use https://docs.mongodb.com/manual/core/gridfs/ for images
// TODO: would it be easier to anonomize if information was broken out to multiple tables.