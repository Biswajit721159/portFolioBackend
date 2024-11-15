const Router = require("express");
const router = Router();
const { login, register, forgotPassword } = require("../controllers/userController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/forgotPassword").post(forgotPassword);

module.exports = router;
