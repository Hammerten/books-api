import { Test, TestingModule } from '@nestjs/testing';
import { TokensLibService } from './tokens-lib.service';

describe('TokensLibService', () => {
  let service: TokensLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensLibService],
    }).compile();

    service = module.get<TokensLibService>(TokensLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
