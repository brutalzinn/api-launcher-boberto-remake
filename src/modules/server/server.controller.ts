import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServerDBService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ApikeyGuard } from 'src/guards/apikey/apikey.guard';

@Controller('server')
@UseGuards(ApikeyGuard)
export class ServerController {
  constructor(private readonly serverDBService: ServerDBService) {}

  @Post()
  create(@Body() createServerDto: CreateServerDto) {
    return this.serverDBService.create(createServerDto);
  }

  @Get()
  findAll() {
    return this.serverDBService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverDBService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverDBService.update(id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverDBService.remove(id);
  }
}
