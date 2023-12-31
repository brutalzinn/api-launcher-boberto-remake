import { Module } from "@nestjs/common";
import { LauncherModule } from "./modules/launcher/launcher.module";
import { ModpackModule } from "./modules/modpack/modpack.module";
import { ServerModule } from "./modules/server/server.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { PrismaService } from "./services/prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ModpackModule, 
    LauncherModule, 
    ServerModule, 
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),],
  controllers: [],
  providers: [
    
  ],
})
export class AppModule {}
