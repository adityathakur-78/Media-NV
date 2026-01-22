import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentProfile } from './entities/student-profile.entity';
import { Mark } from '../marks/marks.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentProfile)
    private studentProfileRepo: Repository<StudentProfile>,

    @InjectRepository(Mark)
    private markRepo: Repository<Mark>,
  ) {}

  async getMyReportCard(userId: string) {
    const studentProfile = await this.studentProfileRepo.findOne({
      where: { user: { id: userId } },
      relations: ['class'],
    });

    if (!studentProfile) {
      throw new NotFoundException('Student is not assigned to any class yet');
    }

    const marks = await this.markRepo.find({
      where: { student: { id: studentProfile.id } },
      relations: ['subject', 'teacher', 'teacher.user'],
    });

    return {
      className: studentProfile.class.name,
      rollNo: studentProfile.rollNo,
      subjects: marks.map((m) => ({
        subjectName: m.subject.name,
        marks: m.marks,
        remarks: m.remarks,
        teacherName: m.teacher.user.fullname,
      })),
    };
  }
}
