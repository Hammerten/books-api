import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  BookEntity,
  BooksLibService,
  CreateBookDto,
  UpdateBookDto,
} from '@app/books-lib';
import {
  ApiPaginatedResponse,
  CurrentUser,
  IdDto,
  IResponse,
  JwtAuthGuard,
  PaginatedResult,
  PaginationDto,
  Status,
  UserPayload,
} from '@app/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'books', version: '1' })
export class BooksController {
  constructor(private readonly booksService: BooksLibService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: BookEntity })
  public findById(@Param() { id }: IdDto): Promise<BookEntity> {
    return this.booksService.findById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiPaginatedResponse(BookEntity)
  public findAll(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResult<BookEntity>> {
    return this.booksService.findAll(pagination, {});
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book successfully deleted',
  })
  public async deleteById(@Param() { id }: IdDto): Promise<IResponse> {
    await this.booksService.deleteById(id);
    return {
      status: Status.SUCCESS,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BookEntity,
  })
  public create(
    @Body() input: CreateBookDto,
    @CurrentUser() { payload }: UserPayload,
  ): Promise<BookEntity> {
    return this.booksService.create(input, payload.sub);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BookEntity,
  })
  public updateById(
    @Param() { id }: IdDto,
    @Body() input: UpdateBookDto,
    @CurrentUser() { payload }: UserPayload,
  ): Promise<BookEntity> {
    return this.booksService.updateById(id, payload.sub, input);
  }
}
