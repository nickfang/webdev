var express = require("express");
var router  = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const {catchErrors, catchDuplicate} = require("../handlers/errorHandlers");

router.get("/", (req, res) => {
	res.render("landing");
});


router.get("/login", userController.loginForm);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/account", authController.isLoggedIn, userController.accountForm);
router.post("/account", catchErrors(userController.updateAccount));

router.get("/register", userController.registerForm);
router.post("/register",
	userController.validateRegister,
	userController.checkDuplicate,
	userController.register,
	authController.login
);

router.get("/account/forgot", userController.forgotAccountForm);
router.post("/account/forgot", catchErrors(authController.reset));
router.get("/account/reset/:token", catchErrors(authController.reset));
router.post("/account/reset/:token",
	authController.confirmedPassword,
	catchErrors(authController.update)
);

module.exports = router;