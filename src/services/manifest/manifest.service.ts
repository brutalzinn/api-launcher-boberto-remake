import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { MinecraftFileType } from './models/manifest.model';
import { CreateManifestModel } from './models/create-manifest.model';
import { FileUtils } from 'src/utils/file-utils';

@Injectable()
export class ManifestService {
    private static manifestFileName : string = "manifest.json"
    async createManifest(createManifest: CreateManifestModel): Promise<void> {
        const manifest = [];
        const environment = createManifest.environment
        const manifestFileOutputPath = path.join(createManifest.outputDirectory, ManifestService.manifestFileName);
        if(FileUtils.fileExists(manifestFileOutputPath)){
          fs.unlinkSync(manifestFileOutputPath)
        }
        const files = FileUtils.getAllFilesInFolder(createManifest.inputDirectory)
        for (const filePath of files) {
          const relativePath = path.relative(createManifest.outputDirectory, filePath).replaceAll(path.sep, '/');
          const fileName = path.basename(filePath)
          const fileStat = fs.statSync(filePath);
          if (fileStat.isDirectory()) {
            continue
          }
          const checksum = await FileUtils.generateSHA1ChecksumForFile(filePath);
          const url = `${createManifest.hostUrl}/${relativePath}`;
          const fileType = ManifestService.getFileType(relativePath);
          const manifestEntry = {
            name: fileName,
            path: relativePath,
            size: fileStat.size,
            hash: checksum,
            url,
            environment,
            type: fileType,
          };
          manifest.push(manifestEntry);
        }
        fs.writeFileSync(manifestFileOutputPath, JSON.stringify(manifest, null, 2));
      }

    public static getFileType(filePath: string): MinecraftFileType {
       const fileType: string = filePath.split("/")[0];
        switch(fileType){
            case "libraries": 
                return MinecraftFileType.LIBRARY;
            case "mods":
                return MinecraftFileType.MOD;
            case "versions":
                return MinecraftFileType.VERSIONCUSTOM;
            default: 
                return MinecraftFileType.FILE;
        }
      }
}
