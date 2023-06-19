const express = require("express");
const router = express.Router();

// POST a new todo
router.post("/", (req, res) => {
  res.send("post a new todo");
})

// GET all todos
router.get("/", (req, res) => {
  res.send("get all todos");
})

// GET a todo
router.get("/:id", (req, res) => {
  res.send("get a todo");
})

// UPDATE a todo
router.put("/:id", (req, res) => {
  res.send("update a todo");
})

// DELETE a todo
router.delete("/:id", (req, res) => {
  res.send("delete a todo");
})

module.exports = router;