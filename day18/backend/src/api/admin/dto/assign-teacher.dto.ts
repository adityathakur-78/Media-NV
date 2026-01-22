import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class AssignTeacherDto {
  @IsString()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  classIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  subjectIds: string[];
}
