import { Test, TestingModule } from '@nestjs/testing';
import { ModpackDatabaseService } from './modpack-database.service';

describe('ModpackDatabaseService', () => {
  let service: ModpackDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModpackDatabaseService],
    }).compile();

    service = module.get<ModpackDatabaseService>(ModpackDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
