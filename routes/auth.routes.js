import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import authControllers from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.route("/login").post(catchAsyncErrors(authControllers.login));
authRouter.route("/register").post(catchAsyncErrors(authControllers.register));

export default authRouter;
