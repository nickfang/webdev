const mongoose = require("mongoose");
const Profile = mongoose.model("Profile");

exports.show = (req, res) => {
	res.render("profiles/show");
};

exports.addProfile = (req, res) => {
	res.render("profiles/new");
};

exports.createProfile = async (req, res) => {
	const profile = new Profile(req.body);
	await profile.save();
	res.redirect("/")
};

exports.editProfile = (req, res) => {
	res.render("profiles/edit")
}

exports.updateProfile = (req, res) => {
	res.redirect("/");
}