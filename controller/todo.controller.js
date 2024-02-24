import mongoose from "mongoose";
import Todo from "../models/Todo.model.js";

const addTodoController = async (req, res) => {
  console.log({ ...req.body });
  const newTodo = new Todo({
    ...req.body,
    userId: new mongoose.Types.ObjectId(req.body.userId),
  });

  const savedTodo = await newTodo.save();
  res.status(201).json(savedTodo);
};

const getTodosController = async (req, res) => {
  const userId = req.body.userId;
  const todos = await Todo.find({ userId });
  res.status(200).json(
    todos.map(({ _id, title, description, completed, createdAt }) => ({
      id: _id,
      title,
      description,
      completed,
      createdAt,
    })),
  );
};

const updateTodoController = async (req, res) => {
  const id = req.params.id;
  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedTodo);
};

const deleteTodoController = async (req, res) => {
  const id = req.params.id;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  res.status(200).json(deletedTodo);
};

const todoControllers = {
  addToDo: addTodoController,
  getTodos: getTodosController,
  deleteTodo: deleteTodoController,
  updateTodo: updateTodoController,
};

export default todoControllers;
