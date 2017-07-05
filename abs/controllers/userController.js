const mongoose = require("mongoose");
const promisify = require("es6-promisify");
const User = mongoose.model("User");
const Profile = mongoose.model("Profile");

mongoose.Promise = global.Promise;

exports.loginForm = (req, res) => {
	res.render("login", { title: "login" });
};

exports.registerForm = (req, res) => {
	res.render("register", { title: "register" });
};

exports.accountForm = (req, res) => {
	res.render("account", { title: "Edit Your Account" });
};

exports.forgotAccountForm = (req, res) => {
	res.render("forgot", { title: "Password Reset" });
};

exports.updateAccount = async (req, res) => {
	const updates = {
		username: req.body.username,
		email: req.body.email
	};
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: "query" }
	);
	res.json(user);
};

exports.showProfile = async (req, res) => {
	const profile = await Profile.findOne({ _id: req.params.id });
};

exports.addProfileForm = (req, res) => {
	res.render("newProfile", { title: "New Profile" });
};

exports.editProfileForm = async (req, res) => {
	const profile = await Profile.findOne({ _id: req.params.id });
	res.render("editProfile", { title: "Update Your Profile", profile })
};


// Middleware
exports.validateRegister = (req, res, next) => {
	req.sanitizeBody("username");
	req.checkBody("username", "You must supply a username!").notEmpty();
	req.checkBody("email", "That email is not vaild!").isEmail();
	req.sanitizeBody("email").normalizeEmail({
		remove_dots: false,
		remove_extensions: false,
		gmail_remove_subaddress: false
	});
	req.checkBody("password", "Password cannot be blank!").notEmpty();
	req.checkBody("password-confirm", "Confirmed password cannot be blank!").notEmpty();
	req.checkBody("password-confirm", "Oops! Your passwords do not match!").equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {
		req.flash("error", errors.map(err => err.msg));
		res.render("register", { title: "Register", body: req.body, flashes: req.flash() });
		return;
	}
	next();
};

// For some reason, when awaiting for the registerWithPromise, if a duplicate email is used, it times out.  It looks like the error isn't being caught.
// I was trying to figure out how to handle this promise rejection, but I think I need to learn more about it to know what's going on.
// (node:14048) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): UserExistsError: A user with the given username is already registered
// (node:14048) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
// created checkDuplicate so we won't ever got to register with a duplicate email.  Not ideal since it hits the database an extra time.
exports.checkDuplicate = async(req, res, next) => {
	const user = await User.findOne( { email: req.body.email });
	if (user && user.email === req.body.email) {
		req.flash("error", `The email ${req.body.email} is already being used.`);
		res.render("register", { title: "Register", body: req.body, flashes: req.flash() });
		return;
	}
	next();
}

exports.register = async (req, res, next) => {
	const user = new User({ email: req.body.email, username: req.body.username });
	const registerWithPromise = promisify(User.register, User);
	await registerWithPromise(user, req.body.password);
	next();
};


// Debugging middleware
exports.printPassportInfo = (req, res, next) => {
	console.log(req._passport);
	console.log(req.user);
	next();
};