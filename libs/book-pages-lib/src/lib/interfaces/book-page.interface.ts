export interface IBookPage {
  id: string;
  bookId: string;
  pageNo: number;
  data: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BaseBookPage = Omit<IBookPage, 'id' | 'createdAt' | 'updatedAt'>;
