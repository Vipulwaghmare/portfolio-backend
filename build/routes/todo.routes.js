"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const todo_controller_1 = __importDefault(require("../controller/todo.controller"));
const todoRouter = (0, express_1.Router)();
todoRouter
    .route("/")
    .post(verifyUser_1.default, (0, catchAsyncErrors_1.default)(todo_controller_1.default.addToDo));
todoRouter
    .route("/")
    .get(verifyUser_1.default, (0, catchAsyncErrors_1.default)(todo_controller_1.default.getTodos));
todoRouter
    .route("/all")
    .delete(verifyUser_1.default, (0, catchAsyncErrors_1.default)(todo_controller_1.default.deleteUserTodos));
todoRouter
    .route("/:id")
    .delete(verifyUser_1.default, (0, catchAsyncErrors_1.default)(todo_controller_1.default.deleteTodo));
todoRouter
    .route("/:id")
    .put(verifyUser_1.default, (0, catchAsyncErrors_1.default)(todo_controller_1.default.updateTodo));
exports.default = todoRouter;
//# sourceMappingURL=todo.routes.js.map