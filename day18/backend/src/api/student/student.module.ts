import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [StudentController],
  providers: [StudentService, UserService],
})
export class StudentModule {}
