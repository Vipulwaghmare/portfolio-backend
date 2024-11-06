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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator_1.default.isEmail, 'Please enter email in correct format'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'password should be atleast 6 char'],
        select: false,
    },
    passwordResetData: {
        type: Object,
        default: {
            expiryTime: {
                type: Date,
                default: null,
            },
            token: {
                type: String,
                default: null,
            },
        },
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = yield (0, bcrypt_1.hash)(this.password, 10);
    });
});
userSchema.pre('updateOne', { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = yield (0, bcrypt_1.hash)(this.password, 10);
    });
});
userSchema.methods.isValidatedPassword = function (usersendPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.compare)(usersendPassword, this.password);
    });
};
userSchema.methods.getAccessToken = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, userEmail: this.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};
userSchema.methods.getRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, userEmail: this.email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '3d',
    });
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.model.js.map