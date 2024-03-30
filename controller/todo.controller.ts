import mongoose from 'mongoose';
import Todo from '../models/Todo.model';
import { TRequest } from './types';

type TodoControllers = {
  addToDo: TRequest;
  getTodos: TRequest;
  updateTodo: TRequest;
  deleteTodo: TRequest;
  deleteUserTodos: TRequest;
};

const todoControllers: TodoControllers = {
  addToDo: async (req, res) => {
    console.log({ ...req.body });
    const newTodo = new Todo({
      ...req.body,
      userId: new mongoose.Types.ObjectId(req.body.userId),
    });

    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  },
  getTodos: async (req, res) => {
    const userId = req.body.userId;
    const todos = await Todo.find({ userId });
    return res.status(200).json(
      todos.map(({ _id, title, description, completed, createdAt }) => ({
        id: _id,
        title,
        description,
        completed,
        createdAt,
      })),
    );
  },
  updateTodo: async (req, res) => {
    const id = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedTodo);
  },
  deleteTodo: async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) throw new Error('Todo not found');
    if (todo.userId?.toString() === req.body.userId) {
      const deletedTodo = await todo.deleteOne();
      return res.status(200).json(deletedTodo);
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  },
  deleteUserTodos: async (req, res) => {
    const userId = req.body.userId;
    const deletedTodos = await Todo.deleteMany({ userId });
    return res.status(200).json(deletedTodos);
  },
};

export default todoControllers;
