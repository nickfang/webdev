var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");

const {catchErrors} = require("../handlers/errorHandlers");

router.get("/", profileController.show);
router.get("/new", profileController.addProfile);
router.post("/new", catchErrors(profileController.createProfile));
router.get("/edit", profileController.editProfile);
router.post("/edit", catchErrors(profileController.updateProfile));

module.exports = router;