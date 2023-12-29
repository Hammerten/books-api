import { Repository } from 'sequelize-typescript';
import { Injectable, Provider } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { DataSource } from '@app/common';
import { BOOKS_REPOSITORY_TOKEN } from './books.repository.interface';
import { BooksSequelizeRepository } from './implementations';
import { Book } from '../models';
import { Sequelize } from 'sequelize';

export function provideBooksRepository(dataSource?: DataSource): Provider[] {
  return [
    {
      provide: BOOKS_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: BooksRepoDependenciesProvider) =>
        provideBooksRepositoryFactory(dependenciesProvider, dataSource),
      inject: [BooksRepoDependenciesProvider],
    },
    BooksRepoDependenciesProvider,
  ];
}

async function provideBooksRepositoryFactory(
  dependenciesProvider: BooksRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new BooksSequelizeRepository(
        dependenciesProvider.sequelize,
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class BooksRepoDependenciesProvider {
  constructor(
    @InjectConnection()
    public sequelize: Sequelize,
    @InjectModel(Book)
    public sequelizeOrmRepository: Repository<Book>,
  ) {}
}
