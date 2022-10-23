const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
	board: {
		type: String,
		required: [true, "please provide the board name"],
	},

	userId: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: [true, "please provide the user id"],
	},
});

module.exports = mongoose.model("KanbanBoard", BoardSchema);
