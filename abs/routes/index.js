var express = require("express");
var router  = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const {catchErrors} = require("../handlers/errorHandlers");

router.get("/", (req, res) => {
	res.render("landing");
});

router.get("/login", userController.loginForm);
router.post("/login", userController.printPassportInfo, authController.login);

router.get("/register", userController.registerForm);
router.post("/register",
	userController.validateRegister,
	userController.register,
	authController.login
);

router.get("/account", userController.account);
router.post("/account", catchErrors(userController.updateAccount));

router.get("/logout", userController.printPassportInfo, authController.logout);

// router.post("/login", (req, res) => {
// 	// TODO: create middle ware for passport or look into JSON Web Token
// 	res.redirect("/");
// });

module.exports = router;