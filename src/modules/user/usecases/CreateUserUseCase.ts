import bcrypt from 'bcrypt';
import { IUserRepository } from '../../../modules/user/repositories/IUserRepository';
import { User } from '../../../modules/user/entities/User';
import { UserRole } from '@prisma/client';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  organizationId: string;
  role: UserRole;
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserInput): Promise<User> {

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }


    const hashedPassword = await bcrypt.hash(data.password, 10);


    const createdUser = await this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      organizationId: data.organizationId,
    });

    return createdUser;
  }
}
