import { Test, TestingModule } from '@nestjs/testing';
import { BooksLibService } from './books-lib.service';

describe('BooksLibService', () => {
  let service: BooksLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksLibService],
    }).compile();

    service = module.get<BooksLibService>(BooksLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
