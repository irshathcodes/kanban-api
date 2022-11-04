const Token = require("../models/Token");
const Todo = require("../models/Todo");
const User = require("../models/User");
const KanbanBoard = require("../models/KanbanBoard");
const removeCookies = require("../utils/removeCookies");
const statusCodes = require("../");

async function getUsername(req, res) {
	const { userId } = req.user;

	const user = await User.findOne({ _id: userId });

	const response = {
		name: user.name,
		userType: user.name.startsWith("guest") ? "guest" : "user",
	};

	res.status(200).json(response);
}

const deleteAccount = async (req, res) => {
	const { userId } = req.user;

	await User.findOneAndDelete({ _id: userId });
	await Todo.deleteMany({ userId: userId });
	await Token.deleteMany({ userId: userId });
	await KanbanBoard.deleteMany({ userId: userId });

	removeCookies(res);
	res
		.status(200)
		.json({ msg: "User and their data has been deleted successfully" });
};

module.exports = { getUsername, deleteAccount };
