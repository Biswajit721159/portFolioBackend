const Router = require("express");
const router = Router();
const {
	login,
	register,
	forgotPassword,
	getResetData,
	savePassword,
} = require("../controllers/userController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/forgotPassword").post(forgotPassword);
router.route("/getResetData/:token").get(getResetData);
router.route("/savePassword").post(savePassword);

module.exports = router;
