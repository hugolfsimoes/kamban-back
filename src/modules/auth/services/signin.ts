
import { prisma } from '../../../infrastructure/prisma';

import { PrismaUserRepository } from '../../user/repositories/prisma/PrismaUserRepository';
import { LoginUserUseCase } from '../usecases/LoginUserUseCase';

export interface SigninInput {
  email: string;
  password: string;
}

export const signin = async (data: SigninInput): Promise<any> => {


  return prisma.$transaction(async tx => {

    const userRepo = new PrismaUserRepository(tx);

    const loginUserUseCase = new LoginUserUseCase(userRepo);

    const user = await loginUserUseCase.execute({
      email: data.email,
      password: data.password,
    });

    return user;
  });
};
