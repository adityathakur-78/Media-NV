import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Role } from 'src/common/enums/roles.enum';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async updateProfile(
    currentUser: { userId: string; role: Role },
    targetUserId: string,
    dto: UpdateProfileDto,
  ) {
    const targetUser = await this.userRepo.findOne({
      where: { id: targetUserId },
    });

    if (!targetUser) throw new NotFoundException('User not found');

    // Student can update only himself
    if (
      currentUser.role === Role.STUDENT &&
      currentUser.userId !== targetUserId
    ) {
      throw new ForbiddenException(
        'Students can update only their own profile',
      );
    }

    // Teacher can update himself OR students
    if (
      currentUser.role === Role.TEACHER &&
      targetUser.role !== Role.STUDENT &&
      currentUser.userId !== targetUserId
    ) {
      throw new ForbiddenException(
        'Teachers can update only their own profile or students',
      );
    }

    // Admin can update anyone (no check needed)

    Object.assign(targetUser, dto);
    return this.userRepo.save(targetUser);
  }

  async getUserById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not found');
    }
    return user;
  }
  async getByRole(role: Role) {
    return this.userRepo.find({ where: { role } });
  }
  async findAllUsers() {
    return this.userRepo.find();
  }
  async updateStatusOfUser(id: string, status: boolean) {
    const user = await this.getUserById(id);
    user.isActive = status;
    return this.userRepo.save(user);
  }

  async createUser(
    currentUser: { userId: string; role: Role },
    dto: RegisterDto,
  ) {
    // Teacher can create only Student
    if (currentUser.role === Role.TEACHER && dto.role !== Role.STUDENT) {
      throw new ForbiddenException('Teacher can create only students');
    }

    // Student cannot create anyone
    if (currentUser.role === Role.STUDENT) {
      throw new ForbiddenException('Students cannot create users');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      fullname: dto.fullname,
      email: dto.email,
      password: hashed,
      role: dto.role,
    });

    return this.userRepo.save(user);
  }
}
