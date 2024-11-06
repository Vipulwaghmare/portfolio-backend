"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncErrors = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
exports.default = catchAsyncErrors;
//# sourceMappingURL=catchAsyncErrors.js.map