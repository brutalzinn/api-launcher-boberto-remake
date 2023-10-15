import { Injectable } from '@nestjs/common';
import { CreateModpackDto } from './dto/create-modpack.dto';
import { UpdateModpackDto } from './dto/update-modpack.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ModPack } from '@prisma/client';

@Injectable()
export class ModpackService {
  constructor(private prisma: PrismaService) {}

//   export class CreateModpackModdedDto {
//     loader: string
//     forgeVersion: string
//     fabricVersion: string
// }


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
        gameVersion: updateModpackDto.gameVersion,
      }
    })

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
