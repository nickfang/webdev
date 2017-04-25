var mongoose = require("mongoose");

var roleSchema = new mongoose.Schema({
	name: 	String,
	year: 	String,
	role: 	String,
	type: 	String,  //Movie, TV Movie, TV Series
});

module.exports = mongoose.model("Role", roleSchema);