import { IsBoolean } from 'class-validator';

export class updateStatusDTO {
  @IsBoolean()
  isActive: boolean;
}
