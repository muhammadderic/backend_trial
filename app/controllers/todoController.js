const Todo = require("../models/todoModel");

// POST a new todo
const createTodo = (req, res) => {
  res.send("post a new todo");
}

// GET all todos
const getAllTodos = (req, res) => {
  res.send("get all todos");
}

// GET a todo
const getTodo = (req, res) => {
  res.send("get a todo");
}

// UPDATE a todo
const updateTodo = (req, res) => {
  res.send("update a todo");
}

// DELETE a todo
const deleteTodo = (req, res) => {
  res.send("delete a todo");
}

module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
}