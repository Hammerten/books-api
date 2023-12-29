import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiPaginatedResponse,
  CurrentUser,
  IdDto,
  JwtAuthGuard,
  PaginatedResult,
  UserPayload,
} from '@app/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BookPageEntity,
  BookPagesLibService,
  FindByBookIdAndPageNoDto,
  FindByBookIdDto,
} from '@app/book-pages-lib';
import { PaginationBookPageDto } from '@app/book-pages-lib';

@ApiTags('bookPages')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'bookPages', version: '1' })
export class BookPagesController {
  constructor(private readonly bookPagesService: BookPagesLibService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: BookPageEntity })
  public findById(@Param() { id }: IdDto): Promise<BookPageEntity> {
    return this.bookPagesService.findById(id);
  }

  @Get(':bookId/resume')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: BookPageEntity })
  public getLastReadByBookIdAndUserId(
    @Param() { bookId }: FindByBookIdDto,
    @CurrentUser() { payload }: UserPayload,
  ): Promise<BookPageEntity> {
    return this.bookPagesService.getLastReadByBookIdAndUserId(
      bookId,
      payload.sub,
    );
  }

  @Get(':bookId/:pageNo')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: BookPageEntity })
  public getAndReadPageByBookIdAndPageNo(
    @Param() { bookId, pageNo }: FindByBookIdAndPageNoDto,
    @CurrentUser() { payload }: UserPayload,
  ): Promise<BookPageEntity> {
    return this.bookPagesService.getAndReadPageByBookIdAndPageNo(
      bookId,
      pageNo,
      payload.sub,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiPaginatedResponse(BookPageEntity)
  public findAll(
    @Query() { page, pageSize, ...filters }: PaginationBookPageDto,
  ): Promise<PaginatedResult<BookPageEntity>> {
    return this.bookPagesService.findAll({ page, pageSize }, filters);
  }
}
