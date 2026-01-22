import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './marks.entity';
import { StudentProfile } from '../student/entities/student-profile.entity';
import { TeacherProfile } from '../teacher/entities/teacher-profile.entity';
import { Subject } from '../subject/subject.entity';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark-dto';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private markRepo: Repository<Mark>,

    @InjectRepository(StudentProfile)
    private studentRepo: Repository<StudentProfile>,

    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(TeacherProfile)
    private teacherRepo: Repository<TeacherProfile>,
  ) {}

  async giveMarks(teacherUserId: string, dto: CreateMarkDto) {
    const teacher = await this.teacherRepo.findOne({
      where: { user: { id: teacherUserId } },
      relations: ['subjects', 'classes'],
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const student = await this.studentRepo.findOne({
      where: { id: dto.studentProfileId },
      relations: ['class'],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const subject = await this.subjectRepo.findOne({
      where: { id: dto.subjectId },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    const mark = this.markRepo.create({
      teacher: teacher,
      student: student,
      subject: subject,
      marks: dto.marks,
      remarks: dto.remarks,
    });

    return await this.markRepo.save(mark);
  }

  async updateMarks(markId: string, dto: UpdateMarkDto) {
    await this.markRepo.update(markId, dto);
    return this.markRepo.findOneBy({ id: markId });
  }

  async getMyClasses(teacherUserId: string) {
    return this.teacherRepo.findOne({
      where: { user: { id: teacherUserId } },
      relations: ['classes', 'subjects'],
    });
  }

  async getStudentsByClass(classId: string) {
    return this.studentRepo.find({
      where: { class: { id: classId } },
      relations: ['user'],
    });
  }
}
