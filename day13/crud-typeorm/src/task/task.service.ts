import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { createTaskDTO } from './dto/createTask.dto';
import { updateTaskDTO } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDTO: createTaskDTO) {
    const task = this.taskRepository.create(createTaskDTO);

    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;
  }

  async update(id: number, updateTaskDTO: updateTaskDTO) {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not Found');
    }
    Object.assign(task, updateTaskDTO);

    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    return await this.taskRepository.remove(task);
  }
}
