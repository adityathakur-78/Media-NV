import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { User } from 'src/domain/entity/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const emailExists = await this.userRepository.exists(dto.email);
    if (emailExists) {
      throw new ConflictException('User with this email already exists');
    }

    const user = User.create({
      id: randomUUID(),
      email: dto.email,
      name: dto.name,
    });

    return await this.userRepository.save(user);
  }
}
