import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide Title"],
  },
  description: {
    type: String,
    required: [true, "Please provide Description"],
  },
  completed: {
    type: Boolean,
    required: [true, "Please provide Status of Todo"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: [true, "User Not Found"],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
