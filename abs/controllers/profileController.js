const mongoose = require("mongoose");
const Profile = mongoose.model("Profile");

exports.show = (req, res) => {
	res.render("profiles/show", { title: ""});
};

exports.addProfile = (req, res) => {
	res.render("profiles/new", {title: "New Profile"});
};

exports.createProfile = async (req, res) => {
	const profile = new Profile(req.body);
	console.log(req.body);
	await profile.save();
	req.flash("success", "Profile created successfully.")
	res.redirect("/profiles")
};

exports.editProfile = async (req, res) => {
	const profile = await Profile.findOne({ _id: req.params.id })
	res.render("profiles/edit", {title: "Update Your Profile", profile})
}

exports.updateProfile = async (req, res) => {
	const profile = await Profile.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true
	}).exec();
	req.flash("success", "Successfully updated your profile.");
	res.redirect("profiles/show");
}