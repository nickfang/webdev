var express = require("express");
var router = express.Router();
var Profile = require("../models/profile");

router.get("/" (req, res) => {
	// only show the user's own profile
	// call find on Profile for the user that's logged in.

});

router.post("/", (req, res) => {
	// get data from form and add to database.
});