import { PartialType } from '@nestjs/mapped-types';
import { createTaskDTO } from './createTask.dto';

export class updateTaskDTO extends PartialType(createTaskDTO) {}
