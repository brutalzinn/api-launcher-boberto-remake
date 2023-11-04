import { Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { uploadZipToStorage, createDir, clearDir } from 'src/helpers/upload.helper';
import { CreateModpackDto } from './dto/create-modpack.dto';
import { UpdateModpackDto } from './dto/update-modpack.dto';
import { ZipService } from 'src/services/zip/zip.service';
import { CurrentUrl } from 'src/decorators/url.decorator';
import { ManifestService } from 'src/services/manifest/manifest.service';
import { Modpack } from './entities/modpack.entity';
import {convertToMetadata } from 'src/helpers/metadata.helper';
import { ApikeyGuard } from 'src/guards/apikey/apikey.guard';
import { GenerateModPackFilesModel } from './models/generate-modpack-files-model';
import { ModpackDatabaseService } from 'src/services/modpack-database/modpack-database.service';
import { ModpackService } from './modpack.service';

@Controller('modpack')
export class ModpackController {
  constructor(private readonly modpackDBService: ModpackDatabaseService, private modpackService: ModpackService,  private zipService : ZipService, private manifestService : ManifestService) {}
  @UseGuards(ApikeyGuard)
  @Post()
  async create(@Body() createModpackDto: CreateModpackDto) {
    return await this.modpackDBService.create(createModpackDto);
  }

  @Get()
  async findAll(@CurrentUrl() url: string) {
    const modpacks =  await this.modpackDBService.findAll();
    const modpacksDto = modpacks.map(function(item) {
    let modpack = new Modpack({
      id: item.id,
      gameVersion: item.gameVersion,
      name: item.name,
      metadata: convertToMetadata([
        {key: "modpack.manifest", value:  `${url}/modpacks/${item.id}/manifest.json`},
        ...item.metadatas,
      ],
      )
    })
    return modpack

  })
    return modpacksDto
  }
  @UseGuards(ApikeyGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.modpackDBService.findOne(id);
  }

  @UseGuards(ApikeyGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateModpackDto: UpdateModpackDto) {
    return await this.modpackDBService.update(id, updateModpackDto);
  }

  @UseGuards(ApikeyGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const modpackDir =  join(process.cwd(), 'public', 'modpacks', id);
    await clearDir(modpackDir)
    return await this.modpackDBService.remove(id);
  }

  @UseGuards(ApikeyGuard)
  @Delete(':id/upload')
  async clearDir(
    @Param('id') id: string) {
    const modpackDir =  join(process.cwd(), 'public', 'modpacks', id);
    await clearDir(modpackDir)
  }

  @UseGuards(ApikeyGuard)
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', uploadZipToStorage))
  async uploadZip(
    @Param('id') id: string,
    @CurrentUrl() url: string,
    @UploadedFile() file: Express.Multer.File) {
    const fileName = file?.filename;
    if (!fileName){
      throw new HttpException("file needs be zip or application/zip", HttpStatus.BAD_REQUEST)
    }
    const originalZipPath = join(process.cwd(), file.path);
    const outputZipPath =  join(process.cwd(), 'public', 'modpacks', id);
    await createDir(outputZipPath)
    const modpackUrl = `${url}/modpacks/${id}`
    const uploadModel : GenerateModPackFilesModel = {
      outputZipPath: outputZipPath,
      zipPath: originalZipPath,
      modpackUrl: modpackUrl
    }
    this.modpackService.generateModPackFiles(uploadModel)
  }

}
