import { Injectable } from '@nestjs/common';
import { CreateModpackDto } from './dto/create-modpack.dto';
import { UpdateModpackDto } from './dto/update-modpack.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ModpackService {
  constructor(private prisma: PrismaService) {}

  async create(createModpackDto: CreateModpackDto) : Promise<boolean> {
    await this.prisma.modPack.create({
      data: {
        name: createModpackDto.name,
        isModded: createModpackDto.isModded,
        gameVersion: createModpackDto.gameVersion,
      }
    })

    return true
  }

  async findAll() {
    let modpacks = await this.prisma.modPack.findMany()
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
        isModded : updateModpackDto.isModded,
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
