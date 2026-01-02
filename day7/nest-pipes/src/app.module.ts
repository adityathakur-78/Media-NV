import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { NyNameController } from './ny-name/ny-name.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { MiddlewareBuilder } from '@nestjs/core';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

@Module({
  imports: [CustomerModule],
  controllers: [
    AppController,
    NyNameController,
    UserRolesController,
    ExceptionController,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
