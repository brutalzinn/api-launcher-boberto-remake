import { Module } from '@nestjs/common';
import { ModpackController } from './modpack.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ZipService } from 'src/services/zip/zip.service';
import { ManifestService } from 'src/services/manifest/manifest.service';
import { ModpackDatabaseService } from 'src/services/modpack-database/modpack-database.service';

@Module({
  controllers: [ModpackController],
  providers: [ModpackDatabaseService, PrismaService, ManifestService, ZipService],
  imports:[]
})
export class ModpackModule {}
