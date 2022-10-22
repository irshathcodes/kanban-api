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
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
