import { Module } from '@nestjs/common';
import { LauncherDBService } from './launcher.service';
import { LauncherController } from './launcher.controller';

@Module({
  controllers: [LauncherController],
  providers: [LauncherDBService],
})
export class LauncherModule {}
