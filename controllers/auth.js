const User = require("../model/User");

const { CustomApiError, statusCodes } = require("../errors/CustomApiError");
const {
	default: strictTransportSecurity,
} = require("helmet/dist/middlewares/strict-transport-security");

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new CustomApiError(
			statusCodes.BAD_REQUEST,
			"required input fields are not provided"
		);
	}

	const user = await User.create(req.body);

	// After user registered creating Jsonwebtoken
	const token = user.createJWT();

	res
		.status(statusCodes.CREATED)
		.json({ msg: "User Registered Successfully", token, name: user.name });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomApiError(
			statusCodes.BAD_REQUEST,
			"Please provide all the required input fields"
		);
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomApiError(
			statusCodes.UNAUTHORIZED,
			"User does not exist / Invalid credentials"
		);
	}

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect) {
		throw new CustomApiError(statusCodes.UNAUTHORIZED, "Invalid Credentials");
	}

	// If password is correct create the token
	const token = user.createJWT();

	res.status(200).json({ token, name: user.name });
};

module.exports = { register, login };
