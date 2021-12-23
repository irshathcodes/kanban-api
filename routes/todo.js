const express = require("express");
const Router = express.Router();
const {
	getAllTodo,
	createTodo,
	getSingleTodo,
	updateTodo,
	deleteTodo,
	deleteAccount,
	deleteAllTodo,
} = require("../controllers/todo");

Router.route("/").get(getAllTodo).post(createTodo).delete(deleteAllTodo);
Router.route("/:id").get(getSingleTodo).patch(updateTodo).delete(deleteTodo);
Router.delete("/user/deleteAccount", deleteAccount);

module.exports = Router;
