const passport = require("passport");

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
}