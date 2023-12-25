import { Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { join } from 'path';
import { uploadZipToStorage, createDir, clearDir } from 'src/helpers/upload.helper';
import { CreateModpackDto } from './dto/create-modpack.dto';
import { UpdateModpackDto } from './dto/update-modpack.dto';
import { ZipService } from 'src/services/zip/zip.service';
import { CurrentUrl } from 'src/decorators/url.decorator';
import { ManifestService } from 'src/services/manifest/manifest.service';
import { Modpack } from './entities/modpack.entity';
import {IMedatada, convertToMetadata } from 'src/helpers/metadata.helper';
import { ApikeyGuard } from 'src/guards/apikey/apikey.guard';
import { GenerateModPackFilesModel } from './models/generate-modpack-files-model';
import { ModpackService } from './modpack.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModpackPrismaService } from './services/prisma/modpack.prisma.service';
import { ModpackMetadataPrismaService } from './services/prisma/modpack-metadata.prisma.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('modpack')
export class ModpackController {
  constructor(
    private prisma: PrismaService,
    private modpackMetadataPrismaService: ModpackMetadataPrismaService,
    private modpackPrismaService: ModpackPrismaService, private modpackService: ModpackService,  private zipService : ZipService, private manifestService : ManifestService) {}
  @UseGuards(ApikeyGuard)
  @Post()
  async create(@Body() createModpackDto: CreateModpackDto) {
    return await this.modpackPrismaService.create({
      data: {
          name: createModpackDto.name,
          gameVersion: createModpackDto.gameVersion,
          metadatas: {
            createMany: {
              data : [
                {
                  key : "modpack.thumb",
                  value: ""
                },
                {
                  key : "modpack.loader.build",
                  value: createModpackDto?.loader?.build ?? ""
                },
                {
                  key : "modpack.loader.type",
                  value: createModpackDto?.loader?.type ?? "normal"
                },
                {
                  key : "modpack.loader.enable",
                  value: createModpackDto?.loader?.enable ? "true" : "false"
                },
                {
                  key : "modpack.verify",
                  value: createModpackDto?.verify ? "true" : "false"
                },
                {
                  key : "modpack.isDefault",
                  value: createModpackDto?.isDefault ? "true" : "false"
                }
              ]
            }
          }
      }
    });
  }

  @Get()
  async findAll(@CurrentUrl() url: string) {
    const modpacks = await this.modpackPrismaService.list({
      include:{
        metadatas: true
      }
    });
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
    return await this.modpackPrismaService.findBy({
      where: {
        id
      }
    });
  }

  @UseGuards(ApikeyGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateModpackDto: UpdateModpackDto) {
    type Metadata = {
      key: string
      value: string
    }

    let modpackFound = await this.modpackPrismaService.findBy({
      where: {
        id
      }
    })

    if(modpackFound == undefined){
      throw new HttpException("Modpack not found", HttpStatus.BAD_REQUEST)
    }


    let updateModPack = this.modpackPrismaService.update({
      where: {
        id
      },
      data: {
          name: updateModpackDto.name,
          gameVersion: updateModpackDto.gameVersion
      }
    });

    this.prisma.add(updateModPack)

    let metadas : Array<Metadata> = [
      {
        key : "modpack.thumb",
        value: updateModpackDto?.thumb ?? "" 
      },
      {
        key : "modpack.loader.build",
        value: updateModpackDto?.loader?.build ?? ""
      },
      {
        key : "modpack.loader.type",
        value: updateModpackDto?.loader?.type ?? "normal"
      },
      {
        key : "modpack.loader.enable",
        value: updateModpackDto?.loader?.enable ? "true" : "false"
      },
      {
        key : "modpack.verify",
        value: updateModpackDto?.verify ? "true" : "false"
      },
      {
        key : "modpack.isDefault",
        value: updateModpackDto?.isDefault ? "true" : "false"
      }
    ]

    for(let i =0; i< metadas.length; i++) {
        let metadata = metadas[i]
        let updateMetadata = this.modpackMetadataPrismaService.upsert({
          where: {
            modpack_id_key: {
              key: metadata.key,
              modpackId: id
            },
          },
          update:{
            value: metadata.value
          },
          create: {
            key: metadata.key,
            value: metadata.value,
            modpack: {
              connect: {
                id
              }
            }
          }
        })

        this.prisma.add(updateMetadata)
    }

    await this.prisma.commit()
  }

  @UseGuards(ApikeyGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const modpackDir =  join(process.cwd(), 'public', 'modpacks', id);
    await clearDir(modpackDir)
    return await this.modpackPrismaService.delete({
      where: {
        id
      }
    });
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
