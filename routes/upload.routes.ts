import { Router } from 'express';
// import { loginSchema } from "../schemas/auth.schema";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
// import verifyUser from "../middlewares/verifyUser";
import uploadControllers from '../controller/upload.controllers';
import { multerLocalStorage } from '../config/multer';
import verifyUser from '../middlewares/verifyUser';

const uploadRouter = Router();

// uploadRouter.route("/cloud-storage").post(multerUpload.single('file'), catchAsyncErrors(uploadControllers.cloudStorage));

// uploadRouter.route("/server-storage").get(verifyUser, multerUpload.single('file'), catchAsyncErrors(uploadControllers.getFile));
uploadRouter
  .route('/server-storage')
  .post(
    verifyUser,
    multerLocalStorage.single('file'),
    catchAsyncErrors(uploadControllers.serverStorage),
  );

export default uploadRouter;
