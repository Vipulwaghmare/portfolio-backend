"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter
    .route("/")
    .get(verifyUser_1.default, (0, catchAsyncErrors_1.default)(user_controller_1.default.getUser));
userRouter
    .route("/")
    .put(verifyUser_1.default, (0, catchAsyncErrors_1.default)(user_controller_1.default.updateUser));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map