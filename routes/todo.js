const express = require("express");
const Router = express.Router();
const {
	getAllTodo,
	createTodo,
	getSingleTodo,
	updateTodo,
	deleteTodo,
	deleteAllTodo,
} = require("../controllers/todo");

Router.route("/").get(getAllTodo).post(createTodo).delete(deleteAllTodo);
Router.route("/:id").get(getSingleTodo).patch(updateTodo).delete(deleteTodo);

module.exports = Router;
