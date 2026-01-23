import {
  Controller,
  Get,
  Req,
  UseGuards,
  Patch,
  Body,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { apiResponse } from 'src/common/response/api-response';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/common/enums/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateProfileDto } from '../user/dto/updateProfile.dto';
import { RegisterDto } from '../auth/dto/register.dto';

@Roles(Role.TEACHER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teacher')
export class TeacherController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMyProfile(@Req() req) {
    const user = await this.userService.getUserById(req.user.userId);
    return new apiResponse(true, 'user fetched Successfully', user);
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

  @Get('allStudents')
  async getAllStudents(@Req() req) {
    const user = await this.userService.getByRole(Role.STUDENT);
    return new apiResponse(true, 'All Student data fetched successfull', user);
  }

  @Patch('student/:id')
  async updateStudentProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ) {
    const user = await this.userService.updateProfile(req.user, id, dto);
    return new apiResponse(true, 'Student profile updated Successfully', user);
  }
  @Post('student/create')
  async createNewStudent(@Req() req, @Body() dto: RegisterDto) {
    dto.role = Role.STUDENT;
    const user = await this.userService.createUser(req.user, dto);
    return new apiResponse(true, 'New Student created Successfully', user);
  }
}
