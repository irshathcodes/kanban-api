const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookieToResponse = ({ res, userId, refreshToken }) => {
	const accessToken = createJWT({ userId });
	const refreshTokenJWT = createJWT({ userId, refreshToken });

	//_____________	 1sec	 1min  1hr	1day	30days
	const thirtyDays = 1000 * 60 * 60 * 24 * 30;
	const fiveMinutes = 1000 * 60 * 5;

	res.cookie("accessToken", accessToken, {
		maxAge: fiveMinutes,
		signed: true,
		httpOnly: true,
		sameSite: "None",
		secure: process.env.NODE_ENV === "production",
	});

	res.cookie("refreshToken", refreshTokenJWT, {
		httpOnly: true,
		expires: new Date(Date.now() + thirtyDays),
		signed: true,
		sameSite: "None",
		secure: process.env.NODE_ENV === "production",
	});
};

module.exports = { createJWT, isTokenValid, attachCookieToResponse };
