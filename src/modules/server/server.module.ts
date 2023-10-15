import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [ServerController],
  providers: [ServerService, PrismaService],
  imports:[
    MulterModule.register({
      dest: './upload/servers'
    })
  ]
})
export class ServerModule {}
