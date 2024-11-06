"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Todo_model_1 = __importDefault(require("../models/Todo.model"));
const todoControllers = {
    addToDo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(Object.assign({}, req.body));
        const newTodo = new Todo_model_1.default(Object.assign(Object.assign({}, req.body), { userId: new mongoose_1.default.Types.ObjectId(req.body.userId) }));
        const savedTodo = yield newTodo.save();
        return res.status(201).json(savedTodo);
    }),
    getTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        const todos = yield Todo_model_1.default.find({ userId });
        return res.status(200).json(todos.map(({ _id, title, description, completed, createdAt }) => ({
            id: _id,
            title,
            description,
            completed,
            createdAt,
        })));
    }),
    updateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const updatedTodo = yield Todo_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(updatedTodo);
    }),
    deleteTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = req.params.id;
        const todo = yield Todo_model_1.default.findById(id);
        if (!todo)
            throw new Error('Todo not found');
        if (((_a = todo.userId) === null || _a === void 0 ? void 0 : _a.toString()) === req.body.userId) {
            const deletedTodo = yield todo.deleteOne();
            return res.status(200).json(deletedTodo);
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }),
    deleteUserTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        const deletedTodos = yield Todo_model_1.default.deleteMany({ userId });
        return res.status(200).json(deletedTodos);
    }),
};
exports.default = todoControllers;
//# sourceMappingURL=todo.controller.js.map