const express = require("express");
const {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} = require("../controller/todo");
const router = express.Router();

router.get("/getTodo", getTodos);
router.post("/addTodo", addTodo);
router.patch("/toggleTodo/:id", toggleTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
