import { Injectable } from '@nestjs/common';
import * as extractzip from 'extract-zip';

@Injectable()
export class ZipService {

   async unzip(zipFilePath: string, outputDirectory: string) : Promise<void> {
    await extractzip(zipFilePath, { dir: outputDirectory})
  // await fs.createReadStream(zipFilePath)
  // .pipe(unzipper.Extract({ path: outputDirectory }))
  // .on('entry', entry => entry.autodrain())
  // .promise()
  }
}
