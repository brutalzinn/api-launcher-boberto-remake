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

export const uploadLauncherToStorage = {
  storage: diskStorage({
    destination: "./public/launcher",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
};


export const removeFile = async (filePath: string): Promise<void> => {
  try {
    if(!fileExists(filePath)){
      return
    }
   await fs.promises.unlink(filePath);
  } catch (err) {
    console.error(err);
  }
};


export const moveFileTo = (originFile: string, newFile: string): void => {
  try {
    if(!fileExists(originFile)){
      return
    }
    fs.cpSync(originFile, newFile, {recursive: true})   
  } catch (err) {
    console.error(err);
  }
};

export const createDir = async (path: string): Promise<void> => {
  try {
    await fs.promises.mkdir(path, {recursive: true})   
  } catch (err) {
    console.error(err);
  }
};

export const clearDir = async (path: string): Promise<void> => {
  try {
    await fs.promises.rmdir(path, {recursive: true})   
  } catch (err) {
    console.error(err);
  }
};

const fileExists = (filePath: string ) : boolean => {
  const exists = fs.existsSync(filePath)
   return exists
}

