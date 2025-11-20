import bcrypt from 'bcryptjs';

import { signToken } from '../../../shared/adapters/jwtAdapter';
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

    const token = signToken({
      userId: user.id,
      role: user.role,
      organizationId: user.organizationId,
    });
    

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}
