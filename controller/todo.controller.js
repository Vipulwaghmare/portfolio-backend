import mongoose from "mongoose";
import Todo from "../models/Todo.model.js";

const addTodoController = async (req, res) => {
  console.log({ ...req.body });
  const newTodo = new Todo({
    ...req.body,
    userId: new mongoose.Types.ObjectId(req.body.userId),
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTodosController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteTodoController = async (req, res) => {};

const todoControllers = {
  addToDo: addTodoController,
  getTodos: getTodosController,
  deleteTodo: deleteTodoController,
};

export default todoControllers;
