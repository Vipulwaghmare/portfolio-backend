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
/* eslint-disable @typescript-eslint/no-explicit-any */
const User_model_1 = __importDefault(require("../models/User.model"));
const skippableUserFields = '-__v -passwordResetData';
// TODO: Add types
const authServices = {
    getUserByEmail: (email) => User_model_1.default.findOne({ email }, 'password'),
    getUserById: (userId) => User_model_1.default.findOne({ _id: userId }, skippableUserFields),
    createUser: (data) => User_model_1.default.create(data),
    updateUser: (userId, data) => User_model_1.default.findOneAndUpdate({ _id: userId }, {
        $set: data,
    }, { new: true, fields: skippableUserFields }),
    validatePassword: (user, password) => user.isValidatedPassword(password),
    getAccessToken: (user) => user.getAccessToken(),
    getRefreshToken: (user) => user.getRefreshToken(),
    updateUserPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.default.findOne({ email });
            if (user === null)
                throw new Error('User not found');
            user.password = password;
            yield user.save();
            return user;
        });
    },
    updateUserPasswordResetData: (email, passwordResetData) => __awaiter(void 0, void 0, void 0, function* () {
        yield User_model_1.default.findOneAndUpdate({ email }, {
            $set: {
                'passwordResetData.expiryTime': passwordResetData.expiryTime,
                'passwordResetData.token': passwordResetData.token,
            },
        }, { new: true });
    }),
    getUserByForgotPasswordToken: (token) => User_model_1.default.findOne({ 'passwordResetData.token': token }),
};
exports.default = authServices;
//# sourceMappingURL=auth.services.js.map