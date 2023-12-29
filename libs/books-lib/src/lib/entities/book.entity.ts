import { Type } from 'class-transformer';
import { IBook } from '../interfaces';
import { UserEntity } from '@app/users-lib';
import { builder } from '@app/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookPageEntity } from '@app/book-pages-lib';

const buildEntity = (entity: BookEntity): BookEntity => {
  return builder<BookEntity>()
    .id(entity.id)
    .title(entity.title)
    .authorId(entity.authorId)
    .pageCount(entity.pageCount)
    .createdAt(entity.createdAt)
    .updatedAt(entity.updatedAt)
    .author(new UserEntity(entity.author))
    .build();
};

export class BookEntity implements IBook {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public authorId: string;
  @Type(() => UserEntity)
  @ApiPropertyOptional()
  public author?: UserEntity;
  @ApiProperty()
  public pageCount: number;
  @Type(() => BookPageEntity)
  public pages?: BookPageEntity[];
  @ApiProperty()
  public createdAt: Date;
  @ApiProperty()
  public updatedAt: Date;

  constructor(entity: BookEntity) {
    Object.assign(this, buildEntity(entity));
  }
}
