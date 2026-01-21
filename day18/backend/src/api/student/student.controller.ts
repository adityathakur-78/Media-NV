import {
  Controller,
  Get,
  Patch,
  Req,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { apiResponse } from 'src/common/response/api-response';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/common/enums/roles.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UpdateProfileDto } from '../user/dto/updateProfile.dto';

@Controller('student')
@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMyProfile(@Req() req) {
    const user = await this.userService.getUserById(req.user.userId);
    return new apiResponse(true, 'User profile fetched Successfully', user);
  }

  @Patch(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ) {
    const user = await this.userService.updateProfile(req.user, id, dto);
    return new apiResponse(true, 'User profile updated Successfully', user);
  }
}
