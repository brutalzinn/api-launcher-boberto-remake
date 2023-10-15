import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as unzipper from 'unzipper';
import * as crypto from 'crypto';
import * as path from 'path';
import { promisify } from 'util';

@Injectable()
export class ZipService {
    private readonly pipelineAsync = promisify(require('stream').pipeline);

  async unzip(zipFilePath: string, outputDirectory: string): Promise<void> {
    await fs.createReadStream(zipFilePath)
      .pipe(unzipper.Parse())
      .on('entry', async (entry) => {
        const fileName = entry.path;
        const filePath = path.join(outputDirectory, fileName);

        if (fileName.endsWith('/')) {
          await fs.promises.mkdir(filePath, { recursive: true });
        } else {
          await this.pipelineAsync(entry, fs.createWriteStream(filePath));
        }
      })
      .promise();
  }
}
