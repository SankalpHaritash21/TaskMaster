import express from "express";
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "../controller/todo.js";

const router = express.Router();

router.get("/getTodo", getTodos);
router.post("/addTodo", addTodo);
router.put("/toggleTodo/:id", toggleTodo);
router.delete("/deleteTodo/:id", deleteTodo);

export default router;
