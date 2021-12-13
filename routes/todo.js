const express = require("express");
const Router = express.Router();
const {
	getAllTodo,
	createTodo,
	getSingleTodo,
	updateTodo,
	deleteTodo,
	deleteAccount,
} = require("../controllers/todo");

Router.route("/").get(getAllTodo).post(createTodo);
Router.route("/:id").get(getSingleTodo).patch(updateTodo).delete(deleteTodo);
Router.delete("/user/deleteAccount", deleteAccount);

module.exports = Router;
