import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../../api/user/entity/user.entity';
import { Subject } from '../../../api/subject/subject.entity';
import { ClassEntity } from '../../../api/classes/class.entity';

@Entity('teacher_profiles')
export class TeacherProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  @ManyToMany(() => ClassEntity)
  @JoinTable()
  classes: ClassEntity[];
}
