import { ApiProperty } from '@nestjs/swagger';
import { IPageInfo } from '../interfaces';

export class PageInfoEntity implements IPageInfo {
  @ApiProperty()
  remainingCount: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  totalCount: number;
}
