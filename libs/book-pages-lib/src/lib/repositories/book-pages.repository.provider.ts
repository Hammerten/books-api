import { BOOK_PAGES_REPOSITORY_TOKEN } from './book-pages.repository.interface';
import { BookPage } from '../models';
import { BookPagesSequelizeRepository } from './implementations';
import { DataSource } from '@app/common';
import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';

export function provideBookPagesRepository(
  dataSource?: DataSource,
): Provider[] {
  return [
    {
      provide: BOOK_PAGES_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: BookPagesRepoDependenciesProvider,
      ) => provideBookPagesRepositoryFactory(dependenciesProvider, dataSource),
      inject: [BookPagesRepoDependenciesProvider],
    },
    BookPagesRepoDependenciesProvider,
  ];
}

async function provideBookPagesRepositoryFactory(
  dependenciesProvider: BookPagesRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new BookPagesSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class BookPagesRepoDependenciesProvider {
  constructor(
    @InjectModel(BookPage)
    public sequelizeOrmRepository: Repository<BookPage>,
  ) {}
}
