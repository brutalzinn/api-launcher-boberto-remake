import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import { MinecraftEnvironment, MinecraftFileType } from './models/manifest.model';

@Injectable()
export class ManifestService {
    async createManifest(inputDir: string, outputDirectory: string, environment : MinecraftEnvironment, hostUrl: string): Promise<void> {
        const manifest = [];
        const files = this.getAllFilesInFolder(inputDir)
        for (const filePath of files) {
          const relativePath = path.relative(outputDirectory, filePath).replaceAll(path.sep, '/');
          const fileName = path.basename(filePath)
          const stats = fs.statSync(filePath);
          if (stats.isDirectory()) {
            continue
          }
          const checksum = await this.generateSHA1ChecksumForFile(filePath);
          const url = `${hostUrl}/${relativePath}`; // Update with your file storage path
          const fileType = this.getFileType(relativePath);
          const manifestEntry = {
            name: fileName,
            path: relativePath,
            size: stats.size,
            checksum,
            url,
            environment,
            type: fileType,
          };
    
          manifest.push(manifestEntry);
        }
    
        const manifestFilePath = path.join(outputDirectory, 'manifest.json');
        fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2));
      }
    
      async  generateSHA1ChecksumForFile(filePath: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const sha1 = crypto.createHash('sha1');
          const stream = fs.createReadStream(filePath);
      
          stream.on('data', (data) => {
            sha1.update(data);
          });
      
          stream.on('end', () => {
            resolve(sha1.digest('hex'));
          });
      
          stream.on('error', (error) => {
            reject(error);
          });
        });
      }
    
      private getFileType(filePath: string): MinecraftFileType {
       const fileType: string = filePath.split("/")[0];
        switch(fileType){
            case "mods": 
                return MinecraftFileType.mods;
            case "saves":
                return MinecraftFileType.saves;
            case "config":
                return MinecraftFileType.config;
            case "natives":
                return MinecraftFileType.natives;
            case "shaderpacks":
                return MinecraftFileType.shaderpacks;
            default: 
                return MinecraftFileType.other;

        }
      }

      getAllFilesInFolder(folderPath: string): string[] {
        const files: string[] = [];
      
        function traverseDirectory(currentPath: string): void {
          const items = fs.readdirSync(currentPath);
          items.forEach((item) => {
            const itemPath = path.join(currentPath, item);
            const stat = fs.statSync(itemPath);
            if (stat.isDirectory()) {
              traverseDirectory(itemPath);
            } else {
              files.push(itemPath);
            }
          });
        }
      
        traverseDirectory(folderPath);
        return files;
      }
}
