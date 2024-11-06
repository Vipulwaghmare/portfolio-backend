"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devLogger_1 = __importDefault(require("./devLogger"));
const prodLogger_1 = __importDefault(require("./prodLogger"));
// How to use
// logger.info("logger")
// logger.error("ERROR")
// logger.warn("ERROR")
// logger.debug("ERROR")
let logger = (0, devLogger_1.default)();
if (process.env.NODE_ENV === "production") {
    logger = (0, prodLogger_1.default)();
}
exports.default = logger;
//# sourceMappingURL=index.js.map