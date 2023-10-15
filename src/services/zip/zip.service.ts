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
    fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: outputDirectory }));
  }
}
