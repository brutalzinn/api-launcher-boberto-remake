import { Injectable } from '@nestjs/common';
import { removeFile } from 'src/helpers/upload.helper';
import { ManifestService } from 'src/services/manifest/manifest.service';
import { MinecraftEnvironment } from 'src/services/manifest/models/manifest.model';
import { ModpackDatabaseService } from 'src/services/modpack-database/modpack-database.service';
import { ZipService } from 'src/services/zip/zip.service';
import { GenerateModPackFilesModel } from './models/generate-modpack-files-model';
import { CreateManifestModel } from 'src/services/manifest/models/create-manifest.model';

@Injectable()
export class ModpackService {

 constructor(
  private zipService: ZipService,
  private manifestService: ManifestService,
  private modpackDatabaseService: ModpackDatabaseService){}

    async generateModPackFiles(uploadFiles: GenerateModPackFilesModel)  {
        await this.zipService.unzip(uploadFiles.zipPath, uploadFiles.outputZipPath)
        let createManifest : CreateManifestModel =  {
          inputDirectory: uploadFiles.outputZipPath, 
          outputDirectory: uploadFiles.outputZipPath,
          environment:  MinecraftEnvironment.CLIENT,
          hostUrl: uploadFiles.modpackUrl
        }
        await this.manifestService.createManifest(createManifest)
        await removeFile(uploadFiles.zipPath)
      }
 }

