const express = require("express");
const router = express.Router();

const {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// POST a new todo
router.post("/", createTodo);

// GET all todos
router.get("/", getAllTodos);

// GET a todo
router.get("/:id", getTodo);

// UPDATE a todo
router.put("/:id", updateTodo);

// DELETE a todo
router.delete("/:id", deleteTodo);

module.exports = router;