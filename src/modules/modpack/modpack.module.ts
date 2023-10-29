import { Module } from '@nestjs/common';
import { ModpackDBService } from './modpack.service';
import { ModpackController } from './modpack.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ZipService } from 'src/services/zip/zip.service';
import { ManifestService } from 'src/services/manifest/manifest.service';

@Module({
  controllers: [ModpackController],
  providers: [ModpackDBService, PrismaService, ManifestService, ZipService],
  imports:[]
})
export class ModpackModule {}
