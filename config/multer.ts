import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// multer configuration
export const multerLocalStorage = multer({
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + '-' + uuidv4() + path.extname(file.originalname),
      );
    },
  }),
});

export const multerS3Storage = multer({});
