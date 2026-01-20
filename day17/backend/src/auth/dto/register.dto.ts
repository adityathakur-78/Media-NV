import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Role } from '../../common/enums/roles.enum';

export class RegisterDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
