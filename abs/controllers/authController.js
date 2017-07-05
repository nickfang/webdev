const passport = require("passport");
const crypto = require("crypto");
const promisify = require("es6-promisify");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.login = passport.authenticate("local", {
	failureRedirect: "/login",
	failureFlash: "Failed Login!",
	successRedirect: "/",
	successFlash: "You are now logged in."
});

exports.logout = (req, res) => {
	req.logout();
	req.flash("success", "You are now logged out!");
	res.redirect("/");
};

exports.forgot = async (req, res) => {
	// check if user exists.
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		req.flash("error", "No account with that email exists.");
		return res.redirect("/login");
	}
	// Set reset tokens and expiry on the account
	user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
	user.resetPasswordExpires = Date.now() + 36000000;
	await user.save();
	// send an email with the token.
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	req.flash("success", `You have been emailed a password reset link.  ${resetURL}`);
	res.redirect("/login");
};

exports.reset = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		req.flash("error", "Password reset is invalid of has expired");
		return res.redirect("/login");
	}
	res.render("reset", { title: "Reset your password" });
};

exports.update = async (req, res) => {
	const user = User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		req.flash("error", "Password reset is invalid or has expired");
		return (res.redirect("/login"))
	}
	const setPassword = promisify(user.setPassword, user);
	await setPassword(req.body.password);
	// remove keys from database
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	const updateUser = await user.save();
	await req.login(updateUser);
	req.flash("success", "Your password has been reset.  You are now logged in.");
	res.redirect("/");
};

// Middleware
exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log("isLoggedIn = true");
		next();
		return;
	}
	req.flash("error", "You must be logged in!");
	res.redirect("/login");
};

exports.confirmedPassword = (req, res, next) => {
	if (req.body.password == req.body["password-confirm"]) {
		next();
		return;
	}
	req.flash("error", "Passwords do not match!");
	res.redirect("back");
};