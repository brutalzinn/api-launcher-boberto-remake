import { Test, TestingModule } from '@nestjs/testing';
import { ModpackService } from './modpack.service';

describe('ModpackService', () => {
  let service: ModpackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModpackService],
    }).compile();

    service = module.get<ModpackService>(ModpackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
