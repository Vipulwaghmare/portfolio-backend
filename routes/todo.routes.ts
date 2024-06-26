import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import verifyUser from "../middlewares/verifyUser";
import todoControllers from "../controller/todo.controller";

const todoRouter = Router();

todoRouter
  .route("/")
  .post(verifyUser, catchAsyncErrors(todoControllers.addToDo));
todoRouter
  .route("/")
  .get(verifyUser, catchAsyncErrors(todoControllers.getTodos));
todoRouter
  .route("/all")
  .delete(verifyUser, catchAsyncErrors(todoControllers.deleteUserTodos));
todoRouter
  .route("/:id")
  .delete(verifyUser, catchAsyncErrors(todoControllers.deleteTodo));
todoRouter
  .route("/:id")
  .put(verifyUser, catchAsyncErrors(todoControllers.updateTodo));

export default todoRouter;
