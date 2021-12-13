const { CustomApiError, statusCodes } = require("../errors/CustomApiError");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
	const authToken = req.headers.authorization;

	if (!authToken || !authToken.startsWith("Bearer ")) {
		throw new CustomApiError(
			statusCodes.BAD_REQUEST,
			"UnAuthorized to access this route / Authentication Invalid"
		);
	}

	const token = authToken.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const { userId, name } = payload;
		// attach the user info in req object
		req.user = { userId, name };

		next();
	} catch (error) {
		throw new CustomApiError(
			statusCodes.UNAUTHORIZED,
			"Authentication Invalid"
		);
	}
};

module.exports = authentication;
