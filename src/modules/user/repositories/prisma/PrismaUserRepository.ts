
import { IUserRepository } from '../IUserRepository';
import { User } from '../../entities/User';
import { Prisma, PrismaClient } from '../../../../generated/prisma';


export class PrismaUserRepository implements IUserRepository {

  constructor(private prisma: PrismaClient | Prisma.TransactionClient) {}

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const u = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        organizationId: userData.organizationId,
      },
    });


    return new User({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role,
      organizationId: u.organizationId,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({ where: { email } });
    if (!u) return null;

    return new User({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role,
      organizationId: u.organizationId,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    });
  }
}
