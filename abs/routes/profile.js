var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");

const {catchErrors} = require("../handlers/errorHandlers");

router.get("/", (req, res) => {
	// only show the user's own profile
	// call find on Profile for the user that's logged in.
	res.render("profiles/show");
});

router.post("/", (req, res) => {
	// console.log(req.body);
	// // get data from form and add to database.
	// var firstName = req.body.firstName;
	// var lastName = req.body.lastName;
	// var gender = req.body.gender;
	// var birthday = req.body.birthday;
	// var city = req.body.city;
	// var state = req.body.state;
	// var zip = req.body.zip;
	// var ethnicities = req.body.ethnicities;
	// var skills = req.body.skills;
	// var filmograpy = req.body.films;
	// var phones = [];
	// if (req.body.phone) {
	// 	for (var i = 0; i < req.body.phone.length; i++) {
	// 		phone.push({"phone": req.body.phones[i], "phoneType": req.body.phoneTypes[i]});
	// 	}
	// }
	// var emails = req.body.emails;
	// var headshots = req.body.headshots;

	res.render("profiles/show");
});

router.get("/new", catchErrors(profileController.createProfile));

router.post("/new", (req, res) => {
	res.render("profiles/show");
});

module.exports = router;