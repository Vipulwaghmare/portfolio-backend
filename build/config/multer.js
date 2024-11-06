"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerS3Storage = exports.multerLocalStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
// multer configuration
exports.multerLocalStorage = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (_, __, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
        },
    }),
});
exports.multerS3Storage = (0, multer_1.default)({});
//# sourceMappingURL=multer.js.map