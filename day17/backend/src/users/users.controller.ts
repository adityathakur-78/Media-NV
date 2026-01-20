import {
  Controller,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
  Get,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  updateProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ) {
    return this.usersService.updateProfile(req.user, id, dto);
  }

  @Get('me')
  getMyProfile(@Req() req) {
    return this.usersService.getUserById(req.user.userId);
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('students')
  getStudents() {
    return this.usersService.getByRole(Role.STUDENT);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('teachers')
  getTeachers() {
    return this.usersService.getByRole(Role.TEACHER);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.usersService.updateStatusOfUser(id, dto.isActive);
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('create')
  createUser(@Req() req, @Body() dto: RegisterDto) {
    return this.usersService.createUser(req.user, dto);
  }
}
