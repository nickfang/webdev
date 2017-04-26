var express = require("express");
var router  = express.Router();
var User = require("../models/user");

router.get("/", (req, res) => {
	res.render("landing");
});

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			// TODO: add this back in when I have flash working.
			// return res.render("register", {"error": err.message});
			console.log("Error registering.");
			return;
		}
		res.redirect("/");
	});
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", (req, res) => {
	// TODO: create middle ware for passport or look into JSON Web Token
	res.redirect("/");
});

module.exports = router;