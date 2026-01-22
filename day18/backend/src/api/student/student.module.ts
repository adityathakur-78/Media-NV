import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { StudentProfile } from './entities/student-profile.entity';
import { Mark } from '../marks/marks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, StudentProfile, Mark])],
  controllers: [StudentController],
  providers: [StudentService, UserService],
})
export class StudentModule {}
