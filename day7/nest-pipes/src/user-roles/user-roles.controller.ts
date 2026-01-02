import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {
  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  getAdminData() {
    return { message: 'Only admin  can acces this data' };
  }

  @Get('user')
  getUserData() {
    return { message: 'Any one can acces this data' };
  }
}
