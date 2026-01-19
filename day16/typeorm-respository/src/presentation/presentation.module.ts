import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { GetUserUseCase } from 'src/application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from 'src/application/use-cases/update-user.use-case';
import { PersistenceModule } from 'src/infrastructure/presistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [UsersController],
  providers: [CreateUserUseCase, GetUserUseCase, UpdateUserUseCase],
})
export class PresentationModule {}
