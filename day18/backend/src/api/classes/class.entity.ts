import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentProfile } from '../student/entities/student-profile.entity';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => StudentProfile, (s) => s.class)
  students: StudentProfile[];
}
