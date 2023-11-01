import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import verifyUser from "../middlewares/verifyUser.js";
import userControllers from "../controller/user.controller.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(verifyUser, catchAsyncErrors(userControllers.getUser));
userRouter
  .route("/")
  .put(verifyUser, catchAsyncErrors(userControllers.updateUser));

export default userRouter;
