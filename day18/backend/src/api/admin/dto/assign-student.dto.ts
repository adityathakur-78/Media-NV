import { IsNumber, IsString } from 'class-validator';

export class AssignStudentDto {
  @IsString()
  userId: string;

  @IsString()
  classId: string;

  @IsNumber()
  rollNo: number;
}
