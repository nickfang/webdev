const mongoose = require("mongoose");
const Profile = mongoose.model("Profile");

exports.createProfile = async (req, res) => {
	const profile = new Profile(req.bodY);
	await profile.save();
	res.redirect("/")
}