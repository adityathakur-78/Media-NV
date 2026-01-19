import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { User } from 'src/domain/entity/user.entity';
import { UpdateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    let updatedUser = user;

    if (dto.name) {
      updatedUser = updatedUser.updateName(dto.name);
    }

    if (dto.isActive !== undefined) {
      updatedUser = dto.isActive
        ? updatedUser.activate()
        : updatedUser.deactivate();
    }

    return await this.userRepository.save(updatedUser);
  }
}
