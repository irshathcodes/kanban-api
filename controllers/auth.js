const User = require("../models/User");
const { CustomApiError } = require("../errors/CustomApiError");
const crypto = require("crypto");
const Token = require("../models/Token");
const removeCookies = require("../utils/removeCookies");
const jwt = require("jsonwebtoken");

const {
	createJWT,
	attachCookieToResponse,
	isTokenValid,
} = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");

async function register(req, res) {
	const { name, email, password } = req.body;

	removeCookies(res);

	if (!name || !email || !password) {
		throw new CustomApiError(400, "All Fields are required");
	}

	const isUserExists = await User.findOne({ email });

	if (isUserExists) {
		throw new CustomApiError(400, "User All ready exists, please login");
	}

	const verificationOtp = crypto.randomInt(100000, 999999);
	const tokenExpiration = new Date(Date.now() + 1000 * 60 * 10);

	await sendEmail({
		to: email,
		subject: "Kanban Board Account Verification",
		html: `<span> OTP Verification code: <h1> ${verificationOtp} </h1> </span>  `,
	});

	const user = await User.create({
		name,
		email,
		password,
		verificationOtp,
		tokenExpiration,
	});

	const verificationToken = createJWT({ email: user.email }); // only object can have expiration in JWT remember that.

	res.cookie("verificationToken", verificationToken, {
		httpOnly: true,
		signed: true,
		sameSite: "None",
		secure: process.env.NODE_ENV === "production",
		expires: new Date(Date.now() + 1000 * 60 * 10),
	});

	res.status(201).json({ msg: "Check your email for otp verification." });
}

async function verifyUser(req, res) {
	const { verificationOtp } = req.body;
	const { verificationToken } = req.signedCookies;

	if (!verificationOtp) {
		throw new CustomApiError(
			400,
			"Verification time expired, Please send token again."
		);
	}
	res.cookie("verificationToken", "done", { expires: new Date(Date.now()) });

	let email;
	jwt.verify(verificationToken, process.env.JWT_SECRET, (err, decoded) => {
		if (err) throw new CustomApiError(400, "Error, please try again later");
		email = decoded.email;
	});

	const user = await User.findOne({ email, verificationOtp });

	if (!user) {
		throw new CustomApiError(400, "Error, please try again later");
	}

	const currentDate = new Date();

	if (user.tokenExpiration < currentDate)
		throw new CustomApiError(400, "Otp Expired");

	user.isVerified = true;
	user.verificationOtp = null;
	user.tokenExpiration = null;

	await user.save();

	res.status(200).json({ msg: "User Verified" });
}

async function login(req, res) {
	const { email, password } = req.body;

	removeCookies(res);

	if (!email || !password) {
		throw new CustomApiError(400, "All Fields are required");
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomApiError(401, "Invalid Credentials");
	}

	if (!user.isVerified) {
		throw new CustomApiError(401, "User not verified!!");
	}

	const isPasswordMatch = await user.comparePassword(password);

	if (!isPasswordMatch) {
		throw new CustomApiError(401, "Incorrect Password");
	}

	let refreshToken = "";

	const existingToken = await Token.findOne({ userId: user._id });

	if (existingToken) {
		const { isValid } = existingToken;
		if (!isValid) {
			throw new CustomApiError(403, "User is not a valid user");
		}
		refreshToken = existingToken.refreshToken;
		attachCookieToResponse({ res, userId: user._id, refreshToken });
		res.status(200).json({ username: user.name });
		return;
	}

	refreshToken = crypto.randomBytes(40).toString("hex");

	const tokenDetails = {
		refreshToken,
		ip: req.ip,
		userAgent: req.headers["user-agent"],
		userId: user._id,
	};

	await Token.create(tokenDetails);

	attachCookieToResponse({ res, userId: user._id, refreshToken });

	res.status(200).json({ username: user.name });
}

async function forgotPassword(req, res) {
	const { email } = req.body;
	const refreshToken = req?.signedCookies?.refreshToken;

	let userId;

	if (refreshToken) {
		const payload = isTokenValid(refreshToken);
		userId = payload.userId;
	}

	if (!email) throw new CustomApiError(400, "please provide valid email");
	const findUser = { email };

	if (userId) {
		findUser._id = userId;
	}

	const user = await User.findOne(findUser);

	if (!user) {
		throw new CustomApiError(404, `No user found with email ${email}`);
	}

	const verificationToken = crypto.randomBytes(40).toString("hex");
	await sendEmail({
		to: user.email,
		subject: "Reset Password Link",
		html: `<span> Click the link to reset the password </span>
	<a href="${process.env.CLIENT_DOMAIN}/user/reset-password?email=${user.email}&token=${verificationToken}">Reset Password</a>
	`,
	});

	user.verificationToken = verificationToken;
	user.tokenExpiration = new Date(Date.now() + 1000 * 60 * 10);

	await user.save();

	res.status(200).json({ msg: "check your email for verification link" });
}

async function resetPassword(req, res) {
	const { verificationToken, email, password } = req.body;

	if (!verificationToken || !email || !password)
		throw new CustomApiError(400, "please provide all the required fields");

	const user = await User.findOne({ email });
	const currentDate = new Date();

	if (user.tokenExpiration < currentDate) {
		return res.status(401).json({ msg: "token expired" });
	}

	if (user && user.verificationToken === verificationToken) {
		user.password = password;
		user.verificationToken = null;
		user.tokenExpiration = null;

		await user.save();
		return res.status(200).json({ msg: "password reset successful" });
	}

	return res.status(400).json({ msg: "provided inputs are incorrect" });
}

async function logout(req, res) {
	await Token.findOneAndDelete({ userId: req.user });

	removeCookies(res);
	res.status(200).json({ msg: "user logged out" });
}

module.exports = {
	register,
	verifyUser,
	login,
	forgotPassword,
	resetPassword,
	logout,
};
