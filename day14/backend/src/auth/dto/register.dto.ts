import { IsEmail, IsString, MinLength } from 'class-validator';

export class registerDTO {
  @IsEmail()
  email: string;

  @MinLength(3)
  @IsString()
  password: string;
}
