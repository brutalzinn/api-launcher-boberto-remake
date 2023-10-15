import { Module } from "@nestjs/common";
import { LauncherModule } from "./modules/launcher/launcher.module";
import { ModpackModule } from "./modules/modpack/modpack.module";
import { ModpackService } from "./modules/modpack/modpack.service";
import { ServerModule } from "./modules/server/server.module";
import { ServerService } from "./modules/server/server.service";
import { ManifestService } from "./services/manifest/manifest.service";
import { PrismaService } from "./services/prisma/prisma.service";
import { ZipService } from "./services/zip/zip.service";

@Module({
  imports: [ModpackModule, LauncherModule, ServerModule],
  controllers: [],
  providers: [PrismaService, ManifestService, ZipService, ServerService, ModpackService],
})
export class AppModule {}