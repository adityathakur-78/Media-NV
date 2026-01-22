import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { ClassEntity } from '../classes/class.entity';
import { Subject } from '../subject/subject.entity';
import { StudentProfile } from '../student/entities/student-profile.entity';
import { TeacherProfile } from '../teacher/entities/teacher-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ClassEntity,
      Subject,
      StudentProfile,
      TeacherProfile,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, UserService],
})
export class AdminModule {}
