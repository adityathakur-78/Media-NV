import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ClassEntity } from '../../../api/classes/class.entity';
import { User } from '../../../api/user/entity/user.entity';

@Entity('student_profiles')
export class StudentProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  rollNo: number;

  @ManyToOne(() => ClassEntity)
  class: ClassEntity;
}
