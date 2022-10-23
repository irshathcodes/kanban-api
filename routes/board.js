const express = require("express");
const router = express.Router();

const {
	getAllBoards,
	createBoard,
	deleteBoard,
} = require("../controllers/board");

router.route("/").get(getAllBoards).post(createBoard).delete(deleteBoard);

module.exports = router;
