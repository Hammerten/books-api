import { builder } from '@app/utils';
import { IBookPage } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

const buildEntity = (entity: BookPageEntity): BookPageEntity => {
  return builder<BookPageEntity>()
    .id(entity.id)
    .bookId(entity.bookId)
    .pageNo(entity.pageNo)
    .data(entity.data)
    .createdAt(entity.createdAt)
    .updatedAt(entity.updatedAt)
    .build();
};

export class BookPageEntity implements IBookPage {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public bookId: string;
  @ApiProperty()
  public pageNo: number;
  @ApiProperty()
  public data: string;
  @ApiProperty()
  public createdAt: Date;
  @ApiProperty()
  public updatedAt: Date;

  constructor(entity: BookPageEntity) {
    Object.assign(this, buildEntity(entity));
  }
}
