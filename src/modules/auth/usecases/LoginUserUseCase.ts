// src/modules/auth/usecases/LoginUserUseCase.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../user/entities/User';
import { IUserRepository } from '../../user/repositories/IUserRepository';
import { UnauthorizedError } from '../error/UnauthorizedError';


export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserOutput {
  user: Omit<User, 'password'>;
  token: string;
}

export class LoginUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(data: LoginUserInput): Promise<LoginUserOutput> {

    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError();
    }


    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError();
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}
