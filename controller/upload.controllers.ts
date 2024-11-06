import { uploadFileToS3 } from '../services/s3.services';
import APIError from '../middlewares/ErrorHandler';
import { TRequest } from './types.js';

type UploadControllers = {
  serverStorage: TRequest;
  cloudStorage: TRequest;
  // getFile: TRequest;
  // uploadImageUrlController: TRequest;
};

const uploadControllers: UploadControllers = {
  serverStorage: async (_, res) => {
    if (process.env.MODE === 'development') {
      return res.json({
        message: 'File Saved on the disk',
      });
    }
    throw new APIError({
      message: 'You can only upload files in Development',
      status: 401,
    });
  },
  cloudStorage: async (req, res) => {
    const file = req.file;
    if (!file) {
      throw new APIError({
        message: 'File is not provided',
        status: 400,
      });
    }
    const data = await uploadFileToS3(file);
    // TODO: Add data in DB
    return res.json({
      message: 'File uploaded successfully',
      ...data,
    });
  },
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

export default uploadControllers;
