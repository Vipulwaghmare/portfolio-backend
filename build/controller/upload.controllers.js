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
const s3_services_1 = require("../services/s3.services");
const ErrorHandler_1 = __importDefault(require("../middlewares/ErrorHandler"));
const uploadControllers = {
    serverStorage: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (process.env.MODE === 'development') {
            return res.json({
                message: 'File Saved on the disk',
            });
        }
        throw new ErrorHandler_1.default({
            message: 'You can only upload files in Development',
            status: 401,
        });
    }),
    cloudStorage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const file = req.file;
        if (!file) {
            throw new ErrorHandler_1.default({
                message: 'File is not provided',
                status: 400,
            });
        }
        const data = yield (0, s3_services_1.uploadFileToS3)(file);
        // TODO: Add data in DB
        return res.json(Object.assign({ message: 'File uploaded successfully' }, data));
    }),
    // getFile: async (req, res) => {
    // },
    // uploadImageUrlController: async (req, res) => {
    //   let response = [];
    //   const { fileType } = req.query;
    //   if (typeof fileType === "string") {
    //     response = [await signedUrl(fileType)];
    //   }
    //   if (Array.isArray(fileType)) {
    //     const respPromise = fileType.map((type) => signedUrl(type));
    //     response = await Promise.all(respPromise);
    //   }
    //   return res.send({ response });
    // }
};
exports.default = uploadControllers;
//# sourceMappingURL=upload.controllers.js.map