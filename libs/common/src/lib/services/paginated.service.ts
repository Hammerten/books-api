import {
  PaginatedResult,
  PaginationInput,
  PaginationProps,
  QueryResult,
} from '../interfaces';

export class PaginatedService<T> {
  protected paginate(
    queryResult: QueryResult<T>,
    pagination: PaginationInput,
    serializer?: any,
  ): PaginatedResult<T> {
    const { items, totalCount } = queryResult;
    const { page, pageSize } = pagination;

    const totalPages = Math.ceil(totalCount / pageSize);
    const remainingCount = totalCount - pageSize * page;

    return {
      items: serializer ? items.map((x) => new serializer(x)) : items,
      pageInfo: {
        remainingCount: remainingCount < 1 ? 0 : remainingCount,
        totalCount,
        totalPages,
      },
    };
  }

  protected getPaginationProps = ({
    page,
    pageSize,
  }: PaginationInput): PaginationProps => ({
    limit: pageSize,
    offset: page === 1 ? 0 : (page - 1) * pageSize,
  });
}
