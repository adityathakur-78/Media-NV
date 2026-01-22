import { Controller, Post, Patch, Req, Param, Body, Get } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/roles.enum';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark-dto';

@Roles(Role.TEACHER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teacher/marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  giveMarks(@Req() req, @Body() dto: CreateMarkDto) {
    return this.marksService.giveMarks(req.user.userId, dto);
  }

  @Patch(':id')
  updateMarks(@Param('id') id: string, @Body() dto: UpdateMarkDto) {
    return this.marksService.updateMarks(id, dto);
  }

  @Get('my-classes')
  getMyClasses(@Req() req) {
    return this.marksService.getMyClasses(req.user.userId);
  }

  @Get('class/:classId/students')
  getStudents(@Param('classId') classId: string) {
    return this.marksService.getStudentsByClass(classId);
  }
}
