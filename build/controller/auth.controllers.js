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
const logger_1 = __importDefault(require("../config/logger"));
const ErrorHandler_1 = __importDefault(require("../middlewares/ErrorHandler"));
const auth_schema_1 = require("../schemas/auth.schema");
const auth_services_1 = __importDefault(require("../services/auth.services"));
const crypto_utils_1 = require("../utils/crypto.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const mail_utils_1 = require("../utils/mail.utils");
const authControllers = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = auth_schema_1.loginSchema.parse(req.body);
        const { email, password } = requestBody;
        logger_1.default.info('[Logging In] email: %s', email);
        if (!email || !password) {
            throw new ErrorHandler_1.default({
                message: 'Email and Password are required',
                status: 400,
            });
        }
        const user = yield auth_services_1.default.getUserByEmail(email);
        if (!user) {
            throw new ErrorHandler_1.default({
                message: 'User not found',
                status: 400,
            });
        }
        const isMatched = yield auth_services_1.default.validatePassword(user, password);
        if (!isMatched) {
            throw new ErrorHandler_1.default({
                message: "Email and Password doesn't match",
                status: 400,
            });
        }
        const accessToken = yield auth_services_1.default.getAccessToken(user);
        const refreshToken = yield auth_services_1.default.getRefreshToken(user);
        return res.json({
            success: `User is logged in with email: ${email}`,
            accessToken,
            refreshToken,
        });
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = auth_schema_1.registerSchema.parse(req.body);
        const { name, email, password } = requestBody;
        logger_1.default.info('[Sign Up] email: %s', email);
        if (!email || !password) {
            throw new ErrorHandler_1.default({
                message: 'Email and Password are required',
                status: 400,
            });
        }
        const isExisting = yield auth_services_1.default.getUserByEmail(email);
        if (isExisting) {
            throw new ErrorHandler_1.default({
                message: 'Email is already in use',
                status: 409,
            });
        }
        const payload = {
            email,
            password,
            name,
        };
        const user = yield auth_services_1.default.createUser(payload);
        logger_1.default.info('[Sign Up] [user created successfully] email: %s', email);
        return res.status(201).json({
            success: 'User is successfully created',
            user,
        });
    }),
    getAccessToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = auth_schema_1.accessTokenSchema.parse(req.body);
        const { refreshToken, userEmail } = body;
        const isVerified = yield (0, jwt_utils_1.verifyRefreshToken)(refreshToken);
        if (!isVerified) {
            throw new ErrorHandler_1.default({
                message: 'Invalid refresh token provided',
                status: 400,
            });
        }
        const user = yield auth_services_1.default.getUserByEmail(userEmail);
        const accessToken = yield auth_services_1.default.getAccessToken(user);
        const newRefreshToken = yield auth_services_1.default.getRefreshToken(user);
        return res.json({
            accessToken,
            refreshToken: newRefreshToken,
        });
    }),
    updatePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = auth_schema_1.updatePasswordSchema.parse(req.body);
        const { userId, oldPassword, newPassword } = body;
        logger_1.default.info('[Updating password] UserId: %s', userId);
        if (!oldPassword || !newPassword) {
            throw new ErrorHandler_1.default({
                message: 'Invalid request',
                status: 400,
            });
        }
        const user = yield auth_services_1.default.getUserById(userId);
        if (!user) {
            throw new ErrorHandler_1.default({
                message: 'User not found',
                status: 400,
            });
        }
        const isMatched = yield auth_services_1.default.validatePassword(user, oldPassword);
        const userEmail = user.email;
        if (!isMatched) {
            (0, mail_utils_1.passwordUpdatedFailedEmail)(userEmail);
            throw new ErrorHandler_1.default({
                message: "Email and Password doesn't match",
                status: 400,
            });
        }
        const updatedUser = yield auth_services_1.default.updateUserPassword(userEmail, newPassword);
        (0, mail_utils_1.passwordUpdatedEmail)(userEmail);
        logger_1.default.info('[Password Updated] email: %s', userEmail);
        return res.json(updatedUser);
    }),
    forgotPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = auth_schema_1.forgotPasswordSchema.parse(req.body);
        const { email } = body;
        logger_1.default.info('[Forgot Password Request] email: %s', email);
        if (!email) {
            throw new ErrorHandler_1.default({
                message: 'Invalid request. Please provide email.',
                status: 400,
            });
        }
        const user = yield auth_services_1.default.getUserByEmail(email);
        if (!user) {
            throw new ErrorHandler_1.default({
                message: 'User not found',
                status: 400,
            });
        }
        const token = (0, crypto_utils_1.genRandomString)();
        const currentDate = new Date();
        const expiryTime = new Date(currentDate.getTime() + 15 * 60 * 1000);
        const passwordResetData = {
            token,
            expiryTime,
        };
        yield auth_services_1.default.updateUserPasswordResetData(email, passwordResetData);
        yield (0, mail_utils_1.sendPasswordResetEmail)(email, token);
        return res.json({
            message: 'Successfully send password reset email to your email',
        });
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const body = auth_schema_1.resetPasswordSchema.parse(req.body);
        const { password, token } = body;
        if (!password || !token) {
            throw new ErrorHandler_1.default({
                message: 'Invalid request',
                status: 400,
            });
        }
        const user = yield auth_services_1.default.getUserByForgotPasswordToken(token);
        if (!((_a = user === null || user === void 0 ? void 0 : user.passwordResetData) === null || _a === void 0 ? void 0 : _a.expiryTime)) {
            throw new ErrorHandler_1.default({
                message: 'You have not requested to reset password',
                status: 400,
            });
        }
        if (user.passwordResetData.expiryTime <= new Date()) {
            throw new ErrorHandler_1.default({
                message: 'Your password reset link is expired. Please try again.',
                status: 400,
            });
        }
        yield auth_services_1.default.updateUserPassword(user.email, password);
        return res.json({
            message: 'Successfully updated user password',
        });
    }),
};
exports.default = authControllers;
//# sourceMappingURL=auth.controllers.js.map