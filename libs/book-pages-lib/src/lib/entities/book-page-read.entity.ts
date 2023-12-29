import { IBookPageRead } from '../interfaces';

export class BookPageReadEntity implements IBookPageRead {
  public id: string;
  public userId: string;
  public bookId: string;
  public pageId: string;
  public pageNo: number;
  public createdAt: Date;
  public updatedAt: Date;
}
