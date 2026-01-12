import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class createTaskDTO {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  descripton: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
