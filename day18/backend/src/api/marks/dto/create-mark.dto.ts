import { IsNumber, IsString } from 'class-validator';

export class CreateMarkDto {
  @IsString()
  studentProfileId: string;

  @IsString()
  subjectId: string;

  @IsNumber()
  marks: number;

  @IsString()
  remarks?: string;
}
