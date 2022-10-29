const express = require("express");
const router = express.Router();

const {
	register,
	login,
	guestLogin,
	verifyUser,
	forgotPassword,
	resetPassword,
	logout,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/login/guest", guestLogin);
router.post("/verify-user", verifyUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.delete("/logout", logout);

module.exports = router;
