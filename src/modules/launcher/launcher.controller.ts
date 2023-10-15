import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseFilePipeBuilder, UploadedFile } from '@nestjs/common';
import { LauncherService } from './launcher.service';
import { CreateLauncherDto } from './dto/create-launcher.dto';
import { UpdateLauncherDto } from './dto/update-launcher.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('launcher')
export class LauncherController {
  constructor(private readonly launcherService: LauncherService) {}

}
