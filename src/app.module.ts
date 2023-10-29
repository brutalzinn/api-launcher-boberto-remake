import { Module } from "@nestjs/common";
import { LauncherModule } from "./modules/launcher/launcher.module";
import { ModpackModule } from "./modules/modpack/modpack.module";
import { ModpackDBService } from "./modules/modpack/modpack.service";
import { ServerModule } from "./modules/server/server.module";
import { ServerDBService } from "./modules/server/server.service";
import { ManifestService } from "./services/manifest/manifest.service";
import { PrismaService } from "./services/prisma/prisma.service";
import { ZipService } from "./services/zip/zip.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { ModpackDbService } from './services/modpack-db/modpack-db.service';
import { ModpackDatabaseService } from './services/modpack-database/modpack-database.service';

@Module({
  imports: [ModpackModule, LauncherModule, ServerModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),],
  controllers: [],
  providers: [PrismaService, ManifestService, ZipService, ServerDBService, ModpackDBService, ModpackDbService, ModpackDatabaseService],
})
export class AppModule {}
