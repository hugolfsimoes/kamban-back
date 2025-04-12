
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../modules/user/repositories/IUserRepository';
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

  async execute(data: CreateUserInput): Promise<any> {



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
      organizationId: data.organizationId
    });

    const token = jwt.sign(
      { userId: createdUser.id },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '24h' }
    );

    return { user: createdUser, token };
  }
}
