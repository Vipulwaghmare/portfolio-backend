"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const mongoose_1 = __importDefault(require("mongoose"));
function connectToDatabase() {
    mongoose_1.default
        .connect(process.env.MONGODB_URL)
        .then(() => logger_1.default.info("DB Connected Successfully"))
        .catch((error) => {
        logger_1.default.error("DB Connection Failed : " + error);
    });
}
exports.default = connectToDatabase;
//# sourceMappingURL=database.js.map