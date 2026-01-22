import { Module } from '@nestjs/common';
import { MarksController } from './marks.controller';
import { MarksService } from './marks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './marks.entity';
import { StudentProfile } from '../student/entities/student-profile.entity';
import { TeacherProfile } from '../teacher/entities/teacher-profile.entity';
import { Subject } from '../subject/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mark, StudentProfile, TeacherProfile, Subject]),
  ],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
