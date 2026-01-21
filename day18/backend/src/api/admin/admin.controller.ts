import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { apiResponse } from 'src/common/response/api-response';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from '../user/dto/updateProfile.dto';
import { Role } from 'src/common/enums/roles.enum';
import { RegisterDto } from '../auth/dto/register.dto';
import { Roles } from 'src/common/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMyProfile(@Req() req) {
    const user = await this.userService.getUserById(req.user.userId);
    return new apiResponse(true, 'Admin profile fetched Successfully', user);
  }

  @Get('all')
  async getAllUsers() {
    const user = await this.userService.findAllUsers();
    return new apiResponse(true, 'All data fetched Successfully', user);
  }

  @Get('all-students')
  async getAllStudents(@Req() req) {
    const user = await this.userService.getByRole(Role.STUDENT);
    return new apiResponse(true, 'All Students data fetched successfull', user);
  }

  @Get('all-teachers')
  async getAllTeachers(@Req() req) {
    const user = await this.userService.getByRole(Role.TEACHER);
    return new apiResponse(true, 'All Teachers data fetched successfull', user);
  }

  @Patch(':id')
  async updateMyProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ) {
    const user = await this.userService.updateProfile(req.user, id, dto);
    return new apiResponse(true, 'User profile updated Successfully', user);
  }

  @Post('student/create')
  async createStudent(@Req() req, @Body() dto: RegisterDto) {
    dto.role = Role.STUDENT;
    const user = await this.userService.createUser(req.user, dto);
    return new apiResponse(true, 'Student created Successfully', user);
  }

  @Post('teacher/create')
  async createTeachers(@Req() req, @Body() dto: RegisterDto) {
    dto.role = Role.TEACHER;
    const user = await this.userService.createUser(req.user, dto);
    return new apiResponse(true, 'Teacher created Successfully', user);
  }

  @Patch('student/update/:id')
  async updateStudentProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ) {
    const user = await this.userService.updateProfile(req.user, id, dto);
    return new apiResponse(true, 'Student profile updated Successfully', user);
  }

  @Patch('teacher/update/:id')
  async updateTeacherProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ) {
    const user = await this.userService.updateProfile(req.user, id, dto);
    return new apiResponse(true, 'User profile updated Successfully', user);
  }
}
