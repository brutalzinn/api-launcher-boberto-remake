import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseFilePipeBuilder, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { LauncherDBService } from './launcher.service';
import { CreateLauncherDto } from './dto/create-launcher.dto';
import { UpdateLauncherDto } from './dto/update-launcher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUrl } from 'src/decorators/url.decorator';
import { clearDir, createDir, moveFileTo, removeFile, uploadLauncherToStorage } from 'src/helpers/upload.helper';
import { join } from 'path';
import { ApikeyGuard } from 'src/guards/apikey/apikey.guard';

@Controller('launcher')
@UseGuards(ApikeyGuard)
export class LauncherController {
  constructor(private readonly launcherService: LauncherDBService) {}

  @Post(':version/upload')
  @UseInterceptors(FileInterceptor('file', uploadLauncherToStorage))
  async uploadLauncherVersion(
    @Param('version') version: string,
    @UploadedFile() file: Express.Multer.File) {
    const fileName = file?.filename;
    if (!fileName){
      throw new HttpException("Something goes wrong", HttpStatus.BAD_REQUEST)
    }
    const outputLauncherVersion = join(process.cwd(), 'public', 'launcher', version, file.filename);
    const outputLatestVersion = join(process.cwd(), 'public', 'launcher', "latest", file.filename);
    await moveFileTo(file.path, outputLauncherVersion)
    await clearDir(outputLatestVersion)
    await moveFileTo(file.path, outputLatestVersion)
    await removeFile(file.path)
  }
}
