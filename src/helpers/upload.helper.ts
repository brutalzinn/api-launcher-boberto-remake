import { diskStorage } from "multer";
import * as path from "path";
import { Observable, from, switchMap, of } from "rxjs";

import * as fs from "fs";

type validFileExtension = 'zip' 
type validMimeType = 'application/zip' 

const validFileExtensions: validFileExtension[] = ['zip'];
const validMimeTypes: validMimeType[] = [
  'application/zip',
];

export const uploadZipToStorage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const fileExtension: string = path.extname(file.originalname);
      const fileName: string = file.originalname + fileExtension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};


export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath);
  } catch (err) {
    console.error(err);
  }
};

export const moveFileTo = (originFile: string, newFile: string): void => {
  try {
    fs.cpSync(originFile, newFile)   
  } catch (err) {
    console.error(err);
  }
};