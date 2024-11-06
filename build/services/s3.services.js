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
exports.signedUrl = exports.deleteMultipleFiles = exports.getFileUrl = exports.deleteFileFromS3 = exports.uploadFileToS3 = void 0;
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const path_1 = __importDefault(require("path"));
// s3 bucket details
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// connecting to s3 bucket
const s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region: bucketRegion,
});
const uploadFileToS3 = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueFileName = (0, uuid_1.v4)() + path_1.default.extname(file.originalname);
    const params = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    const command = new client_s3_1.PutObjectCommand(params);
    yield s3Client.send(command);
    return {
        key: params.Key,
        bucket: params.Bucket,
    };
});
exports.uploadFileToS3 = uploadFileToS3;
const deleteFileFromS3 = (imgKey) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: bucketName,
        Key: imgKey,
    };
    const command = new client_s3_1.DeleteObjectCommand(params);
    yield s3Client.send(command);
});
exports.deleteFileFromS3 = deleteFileFromS3;
const getFileUrl = (fileName) => {
    if (fileName.startsWith('https'))
        return fileName;
    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
};
exports.getFileUrl = getFileUrl;
const deleteMultipleFiles = (fileNames) => {
    fileNames.forEach(key => (0, exports.deleteFileFromS3)(key));
};
exports.deleteMultipleFiles = deleteMultipleFiles;
// export const getSignedUrl = () => {
// const getObjectParams = {
//     Bucket: bucketName,
//     Key: single_product.image
// }
// const command = new GetObjectCommand(getObjectParams);
// const url = await getSignedUrl(s3Client, command);
// single_product.url = url;
// };
const signedUrl = (fileType) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = (0, uuid_1.v4)() + '.' + fileType.split('/')[1];
    const command = new client_s3_1.PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: fileType,
    });
    const signature = yield new Promise((res, rej) => {
        (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 120 })
            .then(signature => {
            res(signature);
        })
            .catch(rej);
    });
    return { fileName, fileType, signature };
});
exports.signedUrl = signedUrl;
//# sourceMappingURL=s3.services.js.map