var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");

const {catchErrors} = require("../handlers/errorHandlers");

router.get("/", profileController.show);
router.get("/new", profileController.addProfile);
router.post("/", catchErrors(profileController.createProfile));
router.get("/:id/edit", profileController.editProfile);
router.post("/:id", catchErrors(profileController.updateProfile));

module.exports = router;