var express = require("express");
var router  = express.Router();
<<<<<<< HEAD
var User = require("../models/user");
=======
>>>>>>> ac42ad67103e05322f09d585bf90159cac380b16

router.get("/", (req, res) => {
	res.render("landing");
});

<<<<<<< HEAD
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

=======
>>>>>>> ac42ad67103e05322f09d585bf90159cac380b16
module.exports = router;