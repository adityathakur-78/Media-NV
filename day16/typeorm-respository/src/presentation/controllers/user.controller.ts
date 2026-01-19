import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { GetUserUseCase } from 'src/application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from 'src/application/use-cases/update-user.use-case';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/application/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    return this.toResponse(user);
  }

  @Get()
  async findAll() {
    const users = await this.getUser.all();
    return users.map((user) => this.toResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.getUser.byId(id);
    return this.toResponse(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.updateUser.execute(id, dto);
    return this.toResponse(user);
  }

  private toResponse(user: any) {
    return {
      id: user.id,
      email: user.email.value,
      name: user.name,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
