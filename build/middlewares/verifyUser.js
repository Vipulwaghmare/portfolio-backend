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
const jwt_utils_1 = require("../utils/jwt.utils");
const auth_schema_1 = require("../schemas/auth.schema");
// TODO: Add API ERROR
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];
        if (!authHeader || Array.isArray(authHeader)) {
            return res.status(403).json({
                message: "You are not Authorized",
                status: 401,
            });
        }
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(403).json({
                message: "You are not authorized",
                status: 401,
            });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = yield (0, jwt_utils_1.verifyAccessToken)(token);
            const decodedData = auth_schema_1.userTokenSchema.parse(decoded);
            req.body.userId = decodedData.userId;
            req.body.userEmail = decodedData.userEmail;
            next();
        }
        catch (e) {
            return res.status(403).json({ error: "Invalid token" });
        }
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.default = verifyUser;
//# sourceMappingURL=verifyUser.js.map