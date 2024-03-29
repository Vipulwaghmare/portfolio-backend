import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import chatControllers from "../controller/chat.controller";

const chatRouter = express.Router();

chatRouter.use(verifyUser);

chatRouter.get("/", chatControllers.getAllChats);

chatRouter.get("/users", chatControllers.searchUsers);

export default chatRouter;
