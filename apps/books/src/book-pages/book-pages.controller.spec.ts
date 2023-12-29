import { Test, TestingModule } from '@nestjs/testing';
import { BookPagesController } from './book-pages.controller';

describe('BookPagesController', () => {
  let controller: BookPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookPagesController],
    }).compile();

    controller = module.get<BookPagesController>(BookPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
