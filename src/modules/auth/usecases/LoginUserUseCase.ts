// src/modules/auth/usecases/LoginUserUseCase.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../user/entities/User';
import { IUserRepository } from '../../user/repositories/IUserRepository';


export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserOutput {
  user: User;
  token: string;
}

export class LoginUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(data: LoginUserInput): Promise<LoginUserOutput> {

    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }


    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }


    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '24h' }
    );

    return { user, token };
  }
}
