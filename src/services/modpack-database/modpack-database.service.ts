import { Injectable } from '@nestjs/common';
import { CreateModpackDto } from 'src/modules/modpack/dto/create-modpack.dto';
import { UpdateModpackDto } from 'src/modules/modpack/dto/update-modpack.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModpackDatabaseService {
    constructor(private prisma: PrismaService) {}

    async create(createModpackDto: CreateModpackDto) : Promise<boolean> {
      await this.prisma.modPack.create({
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
        },
      })
  
      return true
    }
  
    async findAll()  {
      let modpacks = await this.prisma.modPack.findMany({
        include: {
          metadatas: true,
          servers: true
        }
      })
      return modpacks
    }
  
    async findOne(id: string) {
      let modpack = await this.prisma.modPack.findFirst({
        where: {
          id
        }
      })
  
      return modpack
    }
  
    async update(id: string, updateModpackDto: UpdateModpackDto) : Promise<boolean> {
       await this.prisma.modPack.update({
        where: {
          id: id
        },
        data: {
          name: updateModpackDto.name,
          gameVersion: updateModpackDto.gameVersion
        }
      })
  
      let modpackLoaderMetadata = this.prisma.modpackMetadata.upsert({
        where: {
          modpack_id_key: {
            key: "modpack.loader.build",
            modpackId: id
          },
        },
        update:{
          value: updateModpackDto?.loader?.build ?? ""
        },
        create: {
          key: "modpack.loader.build",
          value: updateModpackDto?.loader?.build ?? "",
          modpackId: id
        }
      })
  
      let modpackLoaderType = this.prisma.modpackMetadata.upsert({
        where: {
          modpack_id_key: {
            key: "modpack.loader.type",
            modpackId: id
          },
        },
        update: {
          value: updateModpackDto?.loader?.type
        },
        create: {
          key: "modpack.loader.type",
          value: updateModpackDto?.loader?.build ?? "",
          modpackId: id
        }
      })
  
      let modpackLoaderEnabled = this.prisma.modpackMetadata.upsert({
        where: {
          modpack_id_key: {
            key: "modpack.loader.enable",
            modpackId: id
          },
        },
        update: {
          value: updateModpackDto?.loader?.enable ? "true" : "false"
        },
        create: {
          key: "modpack.loader.enable",
          value: updateModpackDto?.loader?.build ?? "",
          modpackId: id
        }
      })
      let modpackLoaderVerify = this.prisma.modpackMetadata.upsert({
        where: {
          modpack_id_key: {
            key: "modpack.verify",
            modpackId: id
          },
        },
        update: {
          value: updateModpackDto?.verify ? "true" : "false"
        },
        create: {
          key: "modpack.verify",
          value: updateModpackDto?.loader?.build ?? "",
          modpackId: id
        }
      })
  
      let modpackThumb = this.prisma.modpackMetadata.upsert({
        where: {
          modpack_id_key: {
            key: "modpack.thumb",
            modpackId: id
          },
        },
        update: {
          value: updateModpackDto?.thumb
        },
        create: {
          key: "modpack.thumb",
          value: updateModpackDto?.thumb ?? "",
          modpackId: id
        }
      })
  
      let modpackIcon = this.prisma.modpackMetadata.upsert({
        where: {
          modpack_id_key: {
            key: "modpack.icon",
            modpackId: id
          },
        },
        update: {
          value: updateModpackDto?.icon
        },
        create: {
          key: "modpack.icon",
          value: updateModpackDto?.icon ?? "",
          modpackId: id
        }
      })
  
      let modpackIsDefault = this.prisma.modpackMetadata.upsert({
        where: {
          modpack_id_key: {
            key: "modpack.isDefault",
            modpackId: id
          },
        },
        update: {
          value: updateModpackDto?.isDefault ? "true" : "false"
        },
        create: {
          key: "modpack.isDefault",
          value: updateModpackDto?.isDefault ? "true" : "false",
          modpackId: id
        }
      })
  
      await this.prisma.$transaction([
        modpackLoaderMetadata,
        modpackIcon,
        modpackLoaderType,
        modpackLoaderEnabled,
        modpackLoaderVerify,
        modpackThumb,
        modpackIsDefault
      ])
  
      return true
    }
  
   async remove(id: string) : Promise<boolean> {
      await this.prisma.modPack.delete({
        where: {
          id: id
        }
      })
      return true
    }
}
