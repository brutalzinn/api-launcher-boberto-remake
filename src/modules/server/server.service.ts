import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ServerService {

  constructor(private prisma: PrismaService) {}

  async create(createServerDto: CreateServerDto) : Promise<boolean> {
    await this.prisma.server.create({
      data: {
        name: createServerDto.name,
        ip: createServerDto.ip,
        port: createServerDto.port,
        version: createServerDto.version,
        alias: createServerDto.alias,
        gameVersion: createServerDto.gameVersion,
        server: {
          connect: {
            id: createServerDto.modpackId
          }
        }
      }
    })
    return true
  }

 async findAll() {
    let servers = await this.prisma.server.findMany()
    return servers
  }

 async findOne(id: string) {
    let server = await this.prisma.server.findFirst({
      where: {
        id: id
      }
    })
    return server
  }

  async update(id: string, updateServerDto: UpdateServerDto) : Promise<boolean>{
    let server = await this.prisma.server.update({
      where: {
        id: id
      },
      data: {
        name: updateServerDto.name,
        ip:updateServerDto.ip,
        port: updateServerDto.port,
        alias: updateServerDto.alias,
        gameVersion: updateServerDto.gameVersion,
        version : updateServerDto.version
      }
    })
    return true
  }

  async remove(id: string) : Promise<boolean> {
   await this.prisma.server.delete({
    where: {
      id: id
    }
   })
   return true
  }
}
