import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  title: string;

  @Column()
  descripton: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @CreateDateColumn()
  date: Date;
}
