export interface IBookPageRead {
  id: string;
  userId: string;
  bookId: string;
  pageId: string;
  pageNo: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BaseBookPageRead = Omit<
  IBookPageRead,
  'id' | 'createdAt' | 'updatedAt'
>;
