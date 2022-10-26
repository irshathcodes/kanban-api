const { CustomApiError } = require("../errors/CustomApiError");
const KanbanBoard = require("../models/KanbanBoard");
const Todo = require("../models/Todo");

const getAllBoards = async (req, res) => {
	const boards = await KanbanBoard.find({ userId: req.user.userId });

	res.status(200).json({ boards });
};

const createBoard = async (req, res) => {
	const { userId } = req.user;
	const { board } = req.body;

	if (!board) {
		throw new CustomApiError(400, "'board' should be provided");
	}

	const isBoardExist = await KanbanBoard.findOne({
		userId,
		board,
	});

	if (isBoardExist) {
		throw new CustomApiError(
			400,
			"you already have a board with this name, please create a different one"
		);
	}

	const kanbanBoardRes = await KanbanBoard.create({
		board,
		userId,
	});

	res.status(201).json({ kanbanBoard: kanbanBoardRes });
};

const deleteBoard = async (req, res) => {
	const { userId } = req.user;
	const { board } = req.params;

	if (!board) {
		throw new CustomApiError(400, "'board' should be provided");
	}

	await KanbanBoard.findOneAndDelete({
		userId,
		board,
	});

	await Todo.deleteMany({ userId, kanbanBoard: board });

	res.status(200).json({ msg: "board deleted successfully" });
};

module.exports = { getAllBoards, createBoard, deleteBoard };
