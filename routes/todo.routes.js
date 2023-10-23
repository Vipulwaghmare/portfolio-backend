import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import verifyUser from "../middlewares/verifyUser.js";
import todoControllers from "../controller/todo.controller.js";

const todoRouter = Router();

todoRouter
  .route("/")
  .post(verifyUser, catchAsyncErrors(todoControllers.backupTodo));
todoRouter
  .route("/")
  .get(verifyUser, catchAsyncErrors(todoControllers.recoverTodo));
todoRouter
  .route("/")
  .delete(verifyUser, catchAsyncErrors(todoControllers.deleteTodo));

export default todoRouter;
