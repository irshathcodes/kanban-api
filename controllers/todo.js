const Todo = require("../models/Todo");

const { CustomApiError, statusCodes } = require("../errors/CustomApiError");

const getAllTodo = async (req, res) => {
	const { board } = req.query;
	const findObj = {
		userId: req.user.userId,
	};

	if (board) {
		findObj.kanbanBoard = board;
	}

	const todo = await Todo.find(findObj).sort("createdAt");

	res.status(statusCodes.OK).json({ todo, count: todo.length });
};

const createTodo = async (req, res) => {
	const { userId } = req.user;

	const todo = await Todo.create({
		...req.body,
		userId,
	});

	res
		.status(statusCodes.CREATED)
		.json({ todo, msg: "Todo created successfully" });
};

const getSingleTodo = async (req, res) => {
	const todo = await Todo.findOne({
		_id: req.params.id,
		userId: req.user.userId,
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
	} = req;

	const todo = await Todo.findOneAndUpdate(
		{ _id: todoId, userId: userId },
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
		userId: userId,
	});

	if (!todo) {
		throw new CustomApiError(
			statusCodes.NOT_FOUND,
			`No todo found with id: ${todoId}`
		);
	}

	res.status(statusCodes.OK).json({ msg: "Todo deleted successfully" });
};

const deleteAllTodo = async (req, res) => {
	const { userId } = req.user;
	await Todo.deleteMany({ userId: userId });

	res.status(200).json({ msg: "Deleted All Todos" });
};

module.exports = {
	getAllTodo,
	createTodo,
	getSingleTodo,
	updateTodo,
	deleteTodo,
	deleteAllTodo,
};
