import { v4 as uuidv4 } from 'uuid';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';

// s3 bucket details
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// connecting to s3 bucket
const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: bucketRegion,
});

export const uploadFileToS3 = async (file: Express.Multer.File) => {
  const uniqueFileName = uuidv4() + path.extname(file.originalname);
  const params = {
    Bucket: bucketName,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return {
    key: params.Key,
    bucket: params.Bucket,
  };
};

export const deleteFileFromS3 = async (imgKey: string) => {
  const params = {
    Bucket: bucketName,
    Key: imgKey,
  };
  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
};

export const getFileUrl = (fileName: string) => {
  if (fileName.startsWith('https')) return fileName;
  return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
};

export const deleteMultipleFiles = (fileNames: string[]) => {
  fileNames.forEach(key => deleteFileFromS3(key));
};

// export const getSignedUrl = () => {
// const getObjectParams = {
//     Bucket: bucketName,
//     Key: single_product.image
// }
// const command = new GetObjectCommand(getObjectParams);
// const url = await getSignedUrl(s3Client, command);
// single_product.url = url;
// };

export const signedUrl = async (fileType: string) => {
  const fileName = uuidv4() + '.' + fileType.split('/')[1];
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType,
  });
  const signature = await new Promise((res, rej) => {
    getSignedUrl(s3Client, command, { expiresIn: 120 })
      .then(signature => {
        res(signature);
      })
      .catch(rej);
  });
  return { fileName, fileType, signature };
};
