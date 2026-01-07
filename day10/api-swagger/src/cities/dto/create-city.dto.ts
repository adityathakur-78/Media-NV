import {
  IsString,
  IsNotEmpty,
  MinLength,
  isBoolean,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'City Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'City Detail Description' })
  @IsNotEmpty()
  @MinLength(6)
  description: string;

  @ApiProperty({ example: 'active' })
  @IsBoolean()
  active: boolean;
}
