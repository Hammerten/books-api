import { BOOK_PAGES_READ_REPOSITORY_TOKEN } from './book-pages-read.repository.interface';
import { BookPageRead } from '../models';
import { BookPagesReadSequelizeRepository } from './implementations';
import { DataSource } from '@app/common';
import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';

export function provideBookPagesReadRepository(
  dataSource?: DataSource,
): Provider[] {
  return [
    {
      provide: BOOK_PAGES_READ_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: BookPagesReadRepoDependenciesProvider,
      ) =>
        provideBookPagesReadRepositoryFactory(dependenciesProvider, dataSource),
      inject: [BookPagesReadRepoDependenciesProvider],
    },
    BookPagesReadRepoDependenciesProvider,
  ];
}

async function provideBookPagesReadRepositoryFactory(
  dependenciesProvider: BookPagesReadRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new BookPagesReadSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class BookPagesReadRepoDependenciesProvider {
  constructor(
    @InjectModel(BookPageRead)
    public sequelizeOrmRepository: Repository<BookPageRead>,
  ) {}
}
