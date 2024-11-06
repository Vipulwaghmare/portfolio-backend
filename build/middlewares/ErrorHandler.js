"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.convertError = exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const zod_1 = require("zod");
const errorHandler = (err, req, res) => {
    logger_1.default.error(err.message);
    logger_1.default.error(err.stack);
    const response = {
        message: err.message,
        errors: err.errors,
    };
    return res.status(err.status).send(response);
};
exports.errorHandler = errorHandler;
class APIError extends Error {
    constructor({ message, status }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}
const convertError = (err, req, res) => {
    let convertedError = err;
    if (err instanceof zod_1.ZodError) {
        convertedError = new APIError({
            message: 'Invalid request body', // TODO: Change
            status: 500,
        });
    }
    if (!(err instanceof APIError)) {
        convertedError = new APIError({
            message: err.message,
            status: err.status || 500,
        });
    }
    return (0, exports.errorHandler)(convertedError, req, res);
};
exports.convertError = convertError;
const notFound = (req, res) => {
    const err = new APIError({
        message: 'API not found',
        status: 404,
    });
    return (0, exports.errorHandler)(err, req, res);
};
exports.notFound = notFound;
exports.default = APIError;
//# sourceMappingURL=ErrorHandler.js.map