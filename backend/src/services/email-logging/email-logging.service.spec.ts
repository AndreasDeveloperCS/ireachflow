import { Test, TestingModule } from '@nestjs/testing';
import { EmailLoggingService } from './email-logging.service';

describe('EmailLoggingService', () => {
  let service: EmailLoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailLoggingService],
    }).compile();

    service = module.get<EmailLoggingService>(EmailLoggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
