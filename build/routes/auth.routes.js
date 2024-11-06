"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { loginSchema } from "../schemas/auth.schema";
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const auth_controllers_1 = __importDefault(require("../controller/auth.controllers"));
const authRouter = (0, express_1.Router)();
authRouter.route('/login').post((0, catchAsyncErrors_1.default)(auth_controllers_1.default.login));
authRouter.route('/register').post((0, catchAsyncErrors_1.default)(auth_controllers_1.default.register));
authRouter
    .route('/forgot-password')
    .post((0, catchAsyncErrors_1.default)(auth_controllers_1.default.forgotPassword));
authRouter
    .route('/reset-password')
    .patch((0, catchAsyncErrors_1.default)(auth_controllers_1.default.resetPassword));
authRouter
    .route('/getAccessToken')
    .post(verifyUser_1.default, (0, catchAsyncErrors_1.default)(auth_controllers_1.default.getAccessToken));
authRouter
    .route('/update-password')
    .patch(verifyUser_1.default, (0, catchAsyncErrors_1.default)(auth_controllers_1.default.updatePassword));
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map