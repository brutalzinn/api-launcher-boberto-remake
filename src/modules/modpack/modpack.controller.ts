import { Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, UploadedFile, Request, HttpException, HttpStatus, Req, HostParam } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { removeFile, moveFileTo, uploadZipToStorage, createDir } from 'src/helpers/upload.helper';
import { CreateModpackDto } from './dto/create-modpack.dto';
import { UpdateModpackDto } from './dto/update-modpack.dto';
import { ModpackService } from './modpack.service';
import { ZipService } from 'src/services/zip/zip.service';
import { CurrentUrl } from 'src/decorators/url.decorator';
import { ManifestService } from 'src/services/manifest/manifest.service';
import { MinecraftEnvironment } from 'src/services/manifest/models/manifest.model';
import { Modpack } from './entities/modpack.entity';
import { IMedatada, convertToMetadata } from 'src/helpers/metadata.helper';

@Controller('modpack')
export class ModpackController {
  constructor(private readonly modpackService: ModpackService, private zipService : ZipService, private manifestService : ManifestService) {}

  @Post()
  async create(@Body() createModpackDto: CreateModpackDto) {
    return await this.modpackService.create(createModpackDto);
  }

  @Get()
  async findAll(@CurrentUrl() url: string) {
    const modpacks =  await this.modpackService.findAll();
    const modpacksDto = modpacks.map(function(item) {
    let servers = []
    for (var i = 0; i < item.servers.length; i++){
      const ipAddress = item.servers[i].ip
      const port = item.servers[i].port
      const name = item.servers[i].name
      const alias = item.servers[i].alias
      servers.push({key: "server." + i + ".ip", value: ipAddress })
      servers.push({key: "server." + i + ".port", value: port })
      servers.push({key: "server." + i + ".alias", value: alias })
      servers.push({key: "server." + i + ".name", value: name })
    }
    let modpack = new Modpack({
      id: item.id,
      gameVersion: item.gameVersion,
      isDefault: false, ///TODO: ADD LATER
      name: item.name,
      metadata: convertToMetadata([
        {key: "modpack.manifest", value:  `${url}/modpacks/${item.id}/manifest.json`},
        ...item.metadatas,
        ...servers
      ],
      )
    })
    return modpack

  })

    return modpacksDto
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
    const outputZipPath =  join(process.cwd(), 'public', 'modpacks', id);
    await createDir(outputZipPath)
    await this.zipService.unzip(originalZipPath, outputZipPath)
    const modpackUrl = `${url}/modpacks/${id}`
    await this.manifestService.createManifest(outputZipPath, outputZipPath, MinecraftEnvironment.CLIENT, modpackUrl)
    await removeFile(originalZipPath)
  }


}
