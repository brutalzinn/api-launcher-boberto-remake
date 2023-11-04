import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';


export class FileUtils{
    static async generateSHA1ChecksumForFile(filePath: string): Promise<string> {
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

    static getAllFilesInFolder(folderPath: string, toIgnore?: string[]): string[] {
        const files: string[] = [];
        function traverseDirectory(currentPath: string): void {
          const items = fs.readdirSync(currentPath);
          items.forEach((item) => {
            if(toIgnore && toIgnore.includes(item)){
              return
            }
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

      static fileExists(filename: string) : boolean{
        const fileExists = fs.existsSync(filename)
        return fileExists
      }

}