const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");

exports.loginForm = (req, res) => {
	res.render("login", { title: "login" })
};

exports.registerForm = (req, res) => {
	res.render("register", { title: "register" });
};

exports.account = (req, res) => {
	res.render("account", { title: "Edit Your Account" });
};

exports.updateAccount = async (req, res) => {
	const updates = {
		username: req.body.username,
		email: req.body.email
	};
	const user = await user.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: "query" }
	);
	res.json(user);
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

exports.register = async (req, res, next) => {
	const user = new User({ email: req.body.email, username: req.body.username });
	const registerWithPromise = promisify(User.register, User);
	await registerWithPromise(user, req.body.password);
	next();
};


// Debugging
exports.printPassportInfo = (req, res, next) => {
	console.log(req._passport);
	console.log(req.user);
	next();
};