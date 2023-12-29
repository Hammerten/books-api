import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResult } from '../interfaces';
import { PageInfoEntity } from './page-info.entity';

export class PaginatedEntity<T> implements PaginatedResult<T> {
  items: T[];
  @ApiProperty()
  pageInfo: PageInfoEntity;
}
