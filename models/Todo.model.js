import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide Title"],
  },
  description: {
    type: String,
    required: [true, "Please provide Title"],
  },
  completed: {
    type: Boolean,
    required: [true, "Please provide Title"],
  },
  createdAt: {
    type: Date,
    required: [true, "Please provide Date"],
  },
});

const userTodoSchema = new mongoose.Schema({
  todos: {
    type: [todoSchema],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Not Found"],
  },
});

const Todo = mongoose.model("Todo", userTodoSchema);

export default Todo;
