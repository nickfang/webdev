var express = require("express");
var router  = express.Router();
const profileController = require("../controllers/profileController");
const authController = require("../controllers/authController");

const {catchErrors} = require("../handlers/errorHandlers");

// router.get("/", profileController.show);
router.get("/new", authController.isLoggedIn, profileController.addProfile);
router.post("/", catchErrors(profileController.createProfile));
router.get("/:id/edit", profileController.editProfile);
router.post("/:id", catchErrors(profileController.updateProfile));
router.post("/:id/show", profileController.show)

module.exports = router;