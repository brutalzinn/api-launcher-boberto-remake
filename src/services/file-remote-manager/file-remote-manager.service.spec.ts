import { Test, TestingModule } from '@nestjs/testing';
import { FileRemoteManagerService } from './file-remote-manager.service';

describe('FileRemoteManagerService', () => {
  let service: FileRemoteManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileRemoteManagerService],
    }).compile();

    service = module.get<FileRemoteManagerService>(FileRemoteManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
