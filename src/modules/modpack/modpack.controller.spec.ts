import { Test, TestingModule } from '@nestjs/testing';
import { ModpackController } from './modpack.controller';
import { ModpackService } from './modpack.service';

describe('ModpackController', () => {
  let controller: ModpackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModpackController],
      providers: [ModpackService],
    }).compile();

    controller = module.get<ModpackController>(ModpackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
