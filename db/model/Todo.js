const mongoose = require("mongoose");

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
		createdUserId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "please provide the user id"],
		},
		createdUsername: {
			type: String,
			ref: "User",
			required: [true, "please provide the username"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
