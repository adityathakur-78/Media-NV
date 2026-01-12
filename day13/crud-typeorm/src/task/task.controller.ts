import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDTO } from './dto/createTask.dto';
import { apiResponse } from 'src/common/api-response';
import { updateTaskDTO } from './dto/updateTask.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDTO: createTaskDTO) {
    const task = await this.taskService.create(createTaskDTO);

    return new apiResponse(true, 'Task Cerated Succesfully', task);
  }

  @Get()
  async findAll() {
    const task = await this.taskService.findAll();

    return new apiResponse(true, 'All Task fetched Successfully', task);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(+id);

    return new apiResponse(true, 'Task fetched Successfully', task);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDTO: updateTaskDTO) {
    const task = await this.taskService.update(+id, updateTaskDTO);

    return new apiResponse(true, 'Task Updated Successfully', task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const task = await this.taskService.remove(+id);
    return new apiResponse(true, 'Task Deleted Successfully', task);
  }
}
