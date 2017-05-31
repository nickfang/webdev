const mongoose = require("mongoose");
const Profile = mongoose.model("Profile");

exports.show = (req, res) => {
	console.log(res.locals.flashes);
	res.render("profiles/show");
};

exports.addProfile = (req, res) => {
	res.render("profiles/new", {title: "New Profile"});
};

exports.createProfile = async (req, res) => {
	const profile = new Profile(req.body);
	await profile.save();
	req.flash("success", "Profile created successfully.")
	req.flash("success", "It's all good");
	req.flash("error", "Someting wong");
	res.redirect("/profiles")
};

exports.editProfile = (req, res) => {
	res.render("profiles/edit", {title: "Update Your Profile"})
}

exports.updateProfile = (req, res) => {
	res.redirect("/");
}