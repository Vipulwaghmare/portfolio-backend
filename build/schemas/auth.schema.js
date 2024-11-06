"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.updatePasswordSchema = exports.accessTokenSchema = exports.registerSchema = exports.loginSchema = exports.userTokenSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userTokenSchema = zod_1.default.object({
    userId: zod_1.default.string(),
    userEmail: zod_1.default.string(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string({
        required_error: "Email is required",
    }).email({
        message: 'Invalid Email'
    }),
    password: zod_1.default.string().min(3),
});
exports.registerSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Please enter a name"
    }),
    email: zod_1.default.string({
        required_error: "Email is required",
    }).email({
        message: 'Invalid Email'
    }),
    password: zod_1.default.string().min(3),
});
exports.accessTokenSchema = exports.userTokenSchema.extend({
    refreshToken: zod_1.default.string(),
});
exports.updatePasswordSchema = exports.userTokenSchema.extend({
    oldPassword: zod_1.default.string(),
    newPassword: zod_1.default.string(),
});
exports.forgotPasswordSchema = zod_1.default.object({
    email: zod_1.default.string(),
});
exports.resetPasswordSchema = zod_1.default.object({
    password: zod_1.default.string(),
    token: zod_1.default.string(),
});
//# sourceMappingURL=auth.schema.js.map