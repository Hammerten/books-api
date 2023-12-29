import { Test, TestingModule } from '@nestjs/testing';
import { BookPagesLibService } from './book-pages-lib.service';

describe('BookPagesLibService', () => {
  let service: BookPagesLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookPagesLibService],
    }).compile();

    service = module.get<BookPagesLibService>(BookPagesLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
