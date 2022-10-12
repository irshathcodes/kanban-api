const mongoose = require("mongoose");

const SubTaskSchema = new mongoose.Schema({
	driver: mongoose.ObjectId,
	subTask: {
		type: String,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const TodoSchema = new mongoose.Schema(
	{
		todoName: {
			type: String,
			required: [true, "please provide name of the todo"],
		},
		completed: {
			type: Boolean,
			required: true,
			default: false,
		},
		status: {
			type: String,
			default: "todo",
			enum: ["todo", "doing", "done"],
		},
		description: {
			type: String,
			required: true,
		},
		kanbanBoard: {
			type: String,
			required: true,
		},
		subTasks: [SubTaskSchema],
		userId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "please provide the user id"],
		},
		userName: {
			type: String,
			ref: "User",
			required: [true, "please provide the username"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
