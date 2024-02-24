import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import verifyUser from "../middlewares/verifyUser.js";
import todoControllers from "../controller/todo.controller.js";

const todoRouter = Router();

todoRouter
  .route("/")
  .post(verifyUser, catchAsyncErrors(todoControllers.addToDo));
todoRouter
  .route("/")
  .get(verifyUser, catchAsyncErrors(todoControllers.getTodos));
todoRouter
  .route("/:id")
  .delete(verifyUser, catchAsyncErrors(todoControllers.deleteTodo));
todoRouter
  .route("/:id")
  .put(verifyUser, catchAsyncErrors(todoControllers.updateTodo));

export default todoRouter;
