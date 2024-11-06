"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
const rateLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req) => {
        return req.clientIp || ""; // IP address from requestIp.mw(), as opposed to req.ip
    },
    handler: (_, __, ___, options) => {
        throw new ErrorHandler_1.default({
            status: options.statusCode || 500,
            message: `There are too many requests. You are only allowed ${options.max} requests per ${options.windowMs / 60000} minutes`,
        });
    },
});
exports.default = rateLimiter;
//# sourceMappingURL=rateLimiter.js.map