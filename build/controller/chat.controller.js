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
const chat_services_1 = __importDefault(require("../services/chat.services"));
const chatControllers = {
    getAllChats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chats = yield chat_services_1.default.getAllUserChats(req.body.userId);
        return res.json({
            message: "User chats fetched successfully!",
            chats,
        });
    }),
    searchUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield chat_services_1.default.searchUser(req.body.userId);
        return res.json({
            users,
        });
    }),
};
exports.default = chatControllers;
//# sourceMappingURL=chat.controller.js.map