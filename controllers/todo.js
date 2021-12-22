const User = require("../db/model/User");
const Todo = require("../db/model/Todo");

const { CustomApiError, statusCodes } = require("../errors/CustomApiError");

const getAllTodo = async (req, res) => {
	const todo = await Todo.find({ createdUserId: req.user.userId }).sort(
		"createdAt"
	);

	res.status(statusCodes.OK).json({ todo, count: todo.length });
};

const createTodo = async (req, res) => {
	const { userId, name } = req.user;
	(req.body.createdUserId = userId), (req.body.createdUsername = name);

	const todo = await Todo.create(req.body);

	res
		.status(statusCodes.CREATED)
		.json({ todo, msg: "Todo created successfully" });
};

const getSingleTodo = async (req, res) => {
	const todo = await Todo.findOne({
		_id: req.params.id,
		createdUserId: req.user.userId,
	});

	if (!todo) {
		throw new CustomApiError(
			statusCodes.NOT_FOUND,
			`no todo found with id: ${req.params.id}`
		);
	}
	res.status(statusCodes.OK).json({ todo });
};

const updateTodo = async (req, res) => {
	const {
		user: { userId },
		params: { id: todoId },
		body: { todoName, completed },
	} = req;

	// if (!todoName && !completed) {
	// 	throw new CustomApiError(
	// 		statusCodes.BAD_REQUEST,
	// 		"you have sent a empty request!!"
	// 	);
	// }

	const todo = await Todo.findOneAndUpdate(
		{ _id: todoId, createdUserId: userId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!todo) {
		throw new CustomApiError(
			statusCodes.NOT_FOUND,
			`No todo found with id: ${todoId}`
		);
	}

	res.status(statusCodes.OK).json({ todo });
};

const deleteTodo = async (req, res) => {
	const {
		user: { userId },
		params: { id: todoId },
	} = req;

	const todo = await Todo.findOneAndDelete({
		_id: todoId,
		createdUserId: userId,
	});

	if (!todo) {
		throw new CustomApiError(
			statusCodes.NOT_FOUND,
			`No todo found with id: ${todoId}`
		);
	}

	res.status(statusCodes.OK).json({ msg: "Todo deleted successfully" });
};

const deleteAccount = async (req, res) => {
	const { userId } = req.user;

	const deleteUser = await User.findOneAndDelete({ _id: userId });
	const deleteUserTodo = await Todo.deleteMany({ createdUserId: userId });

	res
		.status(statusCodes.OK)
		.json({ msg: "User and their data has been deleted successfully" });
};

module.exports = {
	getAllTodo,
	createTodo,
	getSingleTodo,
	updateTodo,
	deleteTodo,
	deleteAccount,
};
