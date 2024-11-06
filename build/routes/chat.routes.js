"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const chat_controller_1 = __importDefault(require("../controller/chat.controller"));
const chatRouter = express_1.default.Router();
chatRouter.use(verifyUser_1.default);
chatRouter.get("/", chat_controller_1.default.getAllChats);
chatRouter.get("/users", chat_controller_1.default.searchUsers);
exports.default = chatRouter;
//# sourceMappingURL=chat.routes.js.map