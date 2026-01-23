import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ClassEntity } from '../classes/class.entity';
import { Subject } from '../subject/subject.entity';
import { StudentProfile } from '../student/entities/student-profile.entity';
import { TeacherProfile } from '../teacher/entities/teacher-profile.entity';
import { User } from '../user/entity/user.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { AssignStudentDto } from './dto/assign-student.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepo: Repository<ClassEntity>,

    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,

    @InjectRepository(StudentProfile)
    private readonly studentProfileRepo: Repository<StudentProfile>,

    @InjectRepository(TeacherProfile)
    private readonly teacherProfileRepo: Repository<TeacherProfile>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  createClass(dto: CreateClassDto) {
    return this.classRepo.save(dto);
  }

  createSubject(dto: CreateSubjectDto) {
    return this.subjectRepo.save(dto);
  }

  async assignStudent(dto: AssignStudentDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const classEntity = await this.classRepo.findOneBy({ id: dto.classId });
    if (!classEntity) throw new NotFoundException('Class not found');

    let profile = await this.studentProfileRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (!profile) {
      profile = this.studentProfileRepo.create({
        user,
        rollNo: dto.rollNo,
        class: classEntity,
      });
    } else {
      profile.rollNo = dto.rollNo;
      profile.class = classEntity;
    }

    return this.studentProfileRepo.save(profile);
  }

  async assignTeacher(dto: AssignTeacherDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const classes = await this.classRepo.findBy({ id: In(dto.classIds) });
    const subjects = await this.subjectRepo.findBy({ id: In(dto.subjectIds) });

    let profile = await this.teacherProfileRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['classes', 'subjects'],
    });

    if (!profile) {
      profile = this.teacherProfileRepo.create({
        user,
        classes,
        subjects,
      });
    } else {
      // Merge classes (avoid duplicates)
      const existingClassIds = profile.classes.map((c) => c.id);
      const newClasses = classes.filter(
        (c) => !existingClassIds.includes(c.id),
      );
      profile.classes = [...profile.classes, ...newClasses];

      // Merge subjects (avoid duplicates)
      const existingSubjectIds = profile.subjects.map((s) => s.id);
      const newSubjects = subjects.filter(
        (s) => !existingSubjectIds.includes(s.id),
      );
      profile.subjects = [...profile.subjects, ...newSubjects];
    }

    return this.teacherProfileRepo.save(profile);
  }

  async getAllClasses() {
    return this.classRepo.find();
  }

  async getClassById(id: string) {
    const cls = await this.classRepo.findOne({
      where: { id },
    });
    if (!cls) throw new NotFoundException('Class not found');
    return cls;
  }

  async getAllSubjects() {
    return this.subjectRepo.find();
  }

  async getSubjectById(id: string) {
    const subject = await this.subjectRepo.findOne({
      where: { id },
    });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async updateClass(id: string, dto: CreateClassDto) {
    const classEntity = await this.classRepo.findOneBy({ id });
    if (!classEntity) throw new NotFoundException('Class not found');

    Object.assign(classEntity, dto);
    return this.classRepo.save(classEntity);
  }

  async deleteClass(id: string) {
    const classEntity = await this.classRepo.findOneBy({ id });
    if (!classEntity) throw new NotFoundException('Class not found');

    await this.classRepo.remove(classEntity);
    return { success: true, message: 'Class deleted successfully' };
  }

  async updateSubject(id: string, dto: CreateSubjectDto) {
    const subject = await this.subjectRepo.findOneBy({ id });
    if (!subject) throw new NotFoundException('Subject not found');

    Object.assign(subject, dto);
    return this.subjectRepo.save(subject);
  }

  async deleteSubject(id: string) {
    const subject = await this.subjectRepo.findOneBy({ id });
    if (!subject) throw new NotFoundException('Subject not found');

    await this.subjectRepo.remove(subject);
    return { success: true, message: 'Subject deleted successfully' };
  }
}
