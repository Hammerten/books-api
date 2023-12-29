export interface IPageInfo {
  remainingCount: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pageInfo: IPageInfo;
}
