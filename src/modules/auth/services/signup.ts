
import { prisma } from '../../../infrastructure/prisma';

import { CreateOrganizationUseCase } from '../../../modules/organization/usecases/CreateOrganizationUseCase';
import { UserRole } from '@prisma/client';
import { PrismaOrganizationRepository } from '../../organization/repositories/prisma/PrismaOrganizationRepository';
import { PrismaUserRepository } from '../../user/repositories/prisma/PrismaUserRepository';
import { CreateUserUseCase } from '../../user/usecases/CreateUserUseCase';
import jwt from 'jsonwebtoken';
import { signToken } from '../../../shared/adapters/jwtAdapter';

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

export const signup = async (data: SignupInput): Promise<any> => {
  console.log('aaaaa');

  return prisma.$transaction(async tx => {

    const organizationRepo = new PrismaOrganizationRepository(tx);
    const userRepo = new PrismaUserRepository(tx);

    const createOrgUC = new CreateOrganizationUseCase(organizationRepo);
    const organization = await createOrgUC.execute({ name: data.organizationName });

    const createUserUC = new CreateUserUseCase(userRepo);
    const user = await createUserUC.execute({
      name: data.name,
      email: data.email,
      password: data.password,
      role: UserRole.ADMIN,
      organizationId: organization.id,
    });

    const token = signToken({ userId: user.id, role: user.role, organizationId: user.organizationId });

    return { user, token };
  });
};
