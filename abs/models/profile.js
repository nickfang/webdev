const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const profileSchema = new mongoose.Schema({
	firstName: 		String,
	lastName: 		String,
	gender: 			String,
	birthday: 		String,
	age: 				Number,
	city: 			String,
	state: 			String,
	zip:  			String,
	ethnicities:  	[String],
	skills:  		[String],
	filmography:   [String], // TODO: create model to store film information.
	phoneNumbers:  [String],
	phoneTypes:    [String],
	emails:  		[String],
	headshots:  	[String],


	socialMedia:  	[String], // TODO: create model to store social media information {socialMediaName: "name", socialMediaPlatform: "namePlatform"}
	representation: [String],	// may need to make another table for this to include contact information.
	unionMembership: [String]  // TODO:array of enums?
});

// profileSchema.pre("save", function(next) {
// 	if (!this.isModified("birthday")) {
// 		this.age = 38;  // TODO:  figure out how to get the current date and how to subtract the birthday from it
// 	}
// 	next();
// })

module.exports = mongoose.model("Profile", profileSchema);

// TODO: use https://docs.mongodb.com/manual/core/gridfs/ for images
// TODO: would it be easier to anonomize if information was broken out to multiple tables.