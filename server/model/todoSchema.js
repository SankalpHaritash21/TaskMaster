import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const TodoSchema = model("Todo", todoSchema);

export default TodoSchema;
