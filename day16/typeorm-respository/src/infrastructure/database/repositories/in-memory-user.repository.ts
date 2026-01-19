import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = Array.from(this.users.values());
    return users.find((user) => user.email.value === email) || null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }

  async exists(email: string): Promise<boolean> {
    const users = Array.from(this.users.values());
    return users.some((user) => user.email.value === email);
  }

  // Helper for testing
  clear(): void {
    this.users.clear();
  }
}
