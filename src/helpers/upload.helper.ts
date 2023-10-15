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
    destination: "./public",
    filename: (req, file, cb) => {
      // const fileExtension: string = path.extname(file.originalname);
      // const fileName: string = file.filename + fileExtension;//
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};


export const removeFile = async (fullFilePath: string): Promise<void> => {
  try {
   await fs.promises.unlink(fullFilePath);
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

export const createDir = async (path: string): Promise<void> => {
  try {
    fs.promises.mkdir(path, {recursive: true})   
  } catch (err) {
    console.error(err);
  }
};