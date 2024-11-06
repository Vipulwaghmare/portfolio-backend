"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (token, secret) => {
    if (secret !== process.env.ACCESS_TOKEN_SECRET && secret !== process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("Invalid secret");
    }
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.verify(token, secret, (error, decoded) => {
            if (error) {
                rej({
                    message: "Invalid token",
                });
            }
            res(decoded);
        });
    });
};
exports.verifyJwt = verifyJwt;
const verifyAccessToken = (token) => (0, exports.verifyJwt)(token, process.env.ACCESS_TOKEN_SECRET);
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => (0, exports.verifyJwt)(token, process.env.REFRESH_TOKEN_SECRET);
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.utils.js.map