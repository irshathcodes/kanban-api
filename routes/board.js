const express = require("express");
const router = express.Router();

const {
	getAllBoards,
	createBoard,
	deleteBoard,
} = require("../controllers/board");

router.route("/").get(getAllBoards).post(createBoard);
router.delete("/:board", deleteBoard);

module.exports = router;
