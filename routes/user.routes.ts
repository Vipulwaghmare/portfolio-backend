import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import verifyUser from "../middlewares/verifyUser";
import userControllers from "../controller/user.controller";

const userRouter = Router();

userRouter
  .route("/")
  .get(verifyUser, catchAsyncErrors(userControllers.getUser));
userRouter
  .route("/")
  .put(verifyUser, catchAsyncErrors(userControllers.updateUser));

export default userRouter;
