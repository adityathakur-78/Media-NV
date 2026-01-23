import { Controller, Post, Patch, Req, Param, Body, Get } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/roles.enum';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark-dto';
import { apiResponse } from 'src/common/response/api-response';

@Roles(Role.TEACHER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teacher/marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  async giveMarks(@Req() req, @Body() dto: CreateMarkDto) {
    const marks = await this.marksService.giveMarks(req.user.userId, dto);
    return new apiResponse(true, 'Marks added successfully', marks);
  }

  @Patch(':id')
  async updateMarks(@Param('id') id: string, @Body() dto: UpdateMarkDto) {
    const marks = await this.marksService.updateMarks(id, dto);
    return new apiResponse(true, 'Marks updated  successfully', marks);
  }

  @Get('my-classes')
  async getMyClasses(@Req() req) {
    const marks = await this.marksService.getMyClasses(req.user.userId);
    return new apiResponse(true, 'class data fetched successfully', marks);
  }

  @Get('class/:classId/students')
  async getStudents(@Param('classId') classId: string) {
    const marks = await this.marksService.getStudentsByClass(classId);
    return new apiResponse(
      true,
      ' student data fetched from class successfully',
      marks,
    );
  }
}
