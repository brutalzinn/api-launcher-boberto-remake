import { Module } from '@nestjs/common';
import { ModpackController } from './modpack.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ZipService } from 'src/services/zip/zip.service';
import { ManifestService } from 'src/services/manifest/manifest.service';
import { ModpackService } from './modpack.service';
import { ModpackPrismaService } from './services/prisma/modpack.prisma.service';
import { ModpackMetadataPrismaService } from './services/prisma/modpack-metadata.prisma.service';

@Module({
  controllers: [ModpackController],
  providers: [ModpackPrismaService, ModpackMetadataPrismaService, ModpackService, ManifestService, ZipService, PrismaService],
  imports:[]
})
export class ModpackModule {}
