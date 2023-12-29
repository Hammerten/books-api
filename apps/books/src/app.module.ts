import {
  BaseAppSchema,
  BaseExceptionFilter,
  CommonZodValidationPipe,
  HttpExceptionHandler,
  zodConfigValidation,
} from '@app/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { Book } from '@app/books-lib';
import { BookPage, BookPageRead } from '@app/book-pages-lib';
import { BookPagesModule } from './book-pages/book-pages.module';
import { BooksModule } from './books/books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { HealthCheckModule } from '@app/health-check';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from '@app/tokens-lib';
import { User } from '@app/users-lib';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: zodConfigValidation(BaseAppSchema),
      ignoreEnvFile: true,
    }),
    BooksModule,
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        schema: configService.get<string>('BOOKS_DB_SCHEMA'),
        port: configService.get<number>('BOOKS_DB_PORT'),
        username: configService.get<string>('BOOKS_DB_USERNAME'),
        password: configService.get<string>('BOOKS_DB_PASSWORD'),
        database: configService.get<string>('BOOKS_DB_DATABASE'),
        host: configService.get<string>('BOOKS_DB_HOST'),
        dialect: configService.get<Dialect>('BOOKS_DB_DIALECT'),
        models: [Book, User, BookPage, Token, BookPageRead],
      }),
      inject: [ConfigService],
    }),
    BookPagesModule,
    AuthModule,
    UsersModule,
    HealthCheckModule.register({
      service: 'books',
    }),
  ],
  providers: [
    { provide: APP_PIPE, useClass: CommonZodValidationPipe },
    HttpExceptionHandler,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
  ],
})
export class AppModule {}
