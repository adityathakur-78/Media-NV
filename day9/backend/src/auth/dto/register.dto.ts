import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class registerDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
