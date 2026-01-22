import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { StudentProfile } from '../student/entities/student-profile.entity';
import { Subject } from '../subject/subject.entity';
import { TeacherProfile } from '../teacher/entities/teacher-profile.entity';

@Entity('marks')
export class Mark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StudentProfile)
  student: StudentProfile;

  @ManyToOne(() => Subject)
  subject: Subject;

  @ManyToOne(() => TeacherProfile)
  teacher: TeacherProfile;

  @Column()
  marks: number;

  @Column({ nullable: true })
  remarks: string;
}
