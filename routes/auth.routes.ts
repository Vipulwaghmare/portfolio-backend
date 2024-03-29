import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import verifyUser from "../middlewares/verifyUser.js";
import authControllers from "../controller/auth.controllers";

const authRouter = Router();

authRouter.route("/login").post(catchAsyncErrors(authControllers.login));
authRouter.route("/register").post(catchAsyncErrors(authControllers.register));
authRouter
  .route("/forgot-password")
  .post(catchAsyncErrors(authControllers.forgotPassword));
authRouter
  .route("/reset-password")
  .patch(catchAsyncErrors(authControllers.resetPassword));
authRouter
  .route("/getAccessToken")
  .post(verifyUser, catchAsyncErrors(authControllers.getAccessToken));
authRouter
  .route("/update-password")
  .patch(verifyUser, catchAsyncErrors(authControllers.updatePassword));

export default authRouter;
