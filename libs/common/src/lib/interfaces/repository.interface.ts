import { PaginationProps } from './pagination-props.interface';

type Filters<M> = Partial<Record<keyof M, unknown>>;

export interface Repository<M> {
  findById(id: string): Promise<M>;
  findAll(pagination?: PaginationProps, filters?: Filters<M>): Promise<M[]>;
  findByIds(ids: string[]): Promise<M[]>;
  updateById(id: string, dto: Partial<M>): Promise<[affectedCount: number]>;
  deleteById(id: string): Promise<number>;
}
