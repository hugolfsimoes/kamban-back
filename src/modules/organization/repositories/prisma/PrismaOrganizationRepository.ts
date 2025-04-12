
import { Prisma, PrismaClient } from '@prisma/client';
import { IOrganizationRepository } from '../IOrganizationRepository';
import { Organization } from '../../entities/Organization';

export class PrismaOrganizationRepository implements IOrganizationRepository {
  constructor(private prisma: PrismaClient | Prisma.TransactionClient) {}

  async findByName(name: string): Promise<Organization | null> {
    const org = await this.prisma.organization.findFirst({ where: { name } });
    if (!org) return null;
    return new Organization({
      id: org.id,
      name: org.name,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
    });
  }


  async createOrg(data: { name: string; }): Promise<Organization> {
    const org = await this.prisma.organization.create({ data: { name: data.name } });
    return new Organization({
      id: org.id,
      name: org.name,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
    });
  }
}
