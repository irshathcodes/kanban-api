const User = require("../models/User");

async function getUsername(req, res) {
	const { userId } = req.user;

	const user = await User.findOne({ _id: userId });

	res.status(200).json({ name: user.name });
}

module.exports = { getUsername };
