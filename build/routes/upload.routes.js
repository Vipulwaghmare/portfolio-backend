"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { loginSchema } from "../schemas/auth.schema";
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
// import verifyUser from "../middlewares/verifyUser";
const upload_controllers_1 = __importDefault(require("../controller/upload.controllers"));
const multer_1 = require("../config/multer");
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const uploadRouter = (0, express_1.Router)();
// uploadRouter.route("/cloud-storage").post(multerUpload.single('file'), catchAsyncErrors(uploadControllers.cloudStorage));
// uploadRouter.route("/server-storage").get(verifyUser, multerUpload.single('file'), catchAsyncErrors(uploadControllers.getFile));
uploadRouter
    .route('/server-storage')
    .post(verifyUser_1.default, multer_1.multerLocalStorage.single('file'), (0, catchAsyncErrors_1.default)(upload_controllers_1.default.serverStorage));
exports.default = uploadRouter;
//# sourceMappingURL=upload.routes.js.map