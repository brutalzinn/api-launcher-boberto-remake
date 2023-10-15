import { Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, UploadedFile, Request, HttpException, HttpStatus, Req, HostParam } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { removeFile, moveFileTo, uploadZipToStorage } from 'src/helpers/upload.helper';
import { CreateModpackDto } from './dto/create-modpack.dto';
import { UpdateModpackDto } from './dto/update-modpack.dto';
import { ModpackService } from './modpack.service';
import { ZipService } from 'src/services/zip/zip.service';
import { CurrentUrl } from 'src/decorators/url.decorator';
import { ManifestService } from 'src/services/manifest/manifest.service';
import { MinecraftEnvironment } from 'src/services/manifest/models/manifest.model';

@Controller('modpack')
export class ModpackController {
  constructor(private readonly modpackService: ModpackService, private zipService : ZipService, private manifestService : ManifestService) {}

  @Post()
  async create(@Body() createModpackDto: CreateModpackDto) {
    return await this.modpackService.create(createModpackDto);
  }

  @Get()
  async findAll() {
    return await this.modpackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.modpackService.findOne(id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateModpackDto: UpdateModpackDto) {
    return await this.modpackService.update(id, updateModpackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.modpackService.remove(id);
  }


  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', uploadZipToStorage))
  async uploadImage(
    @Param('id') id: string,
    @CurrentUrl() url: string,
    @UploadedFile() file: Express.Multer.File) {
    const fileName = file?.filename;
    if (!fileName){
      throw new HttpException("file needs be zip or application/zip", HttpStatus.BAD_REQUEST)
    }
    const originalZipPath = join(process.cwd(), file.path);
    const finalUploadZipPath = join(process.cwd(), 'uploads', 'modpacks', id, file.originalname);
    const finalUnzipDir =  join(process.cwd(), 'uploads', 'modpacks', id);
   
    moveFileTo(originalZipPath, finalUploadZipPath)
    removeFile(originalZipPath)

    await this.zipService.unzip(finalUploadZipPath, finalUnzipDir)
    removeFile(finalUploadZipPath)
    const modpackUrl = `${url}/${id}`
    await this.manifestService.createManifest(finalUnzipDir, finalUnzipDir, MinecraftEnvironment.CLIENT, modpackUrl)
  }


}
