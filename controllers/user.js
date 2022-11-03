const Token = require("../models/Token");
const Todo = require("../models/Todo");
const User = require("../models/User");
const KanbanBoard = require("../models/KanbanBoard");
const removeCookies = require("../utils/removeCookies");

async function getUsername(req, res) {
	const { userId } = req.user;

	const user = await User.findOne({ _id: userId });

	res.status(200).json({ name: user.name });
}

const deleteAccount = async (req, res) => {
	const { userId } = req.user;

	await User.findOneAndDelete({ _id: userId });
	await Todo.deleteMany({ userId: userId });
	await Token.deleteMany({ userId: userId });
	await KanbanBoard.deleteMany({ userId: userId });

	removeCookies(res);
	res
		.status(statusCodes.OK)
		.json({ msg: "User and their data has been deleted successfully" });
};

module.exports = { getUsername, deleteAccount };
