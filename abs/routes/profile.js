var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");

const {catchErrors} = require("../handlers/errorHandlers");

router.get("/", profileController.show);
router.get("/new", profileController.addProfile);
router.post("/new", catchErrors(profileController.createProfile));
router.get("/:id/edit", profileController.editProfile);
router.post("/:id/edit", catchErrors(profileController.updateProfile));

module.exports = router;