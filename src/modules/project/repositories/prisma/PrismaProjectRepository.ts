// src/modules/board/repositories/prisma/PrismaBoardRepository.ts
import { PrismaClient } from '@prisma/client';
import { IProjectRepository, ProjectDTO } from '../IProjectRepository';

export class PrismaProjectRepository implements IProjectRepository {
  constructor(private prisma: PrismaClient) {}

  async findManyByOrganization(organizationId: string): Promise<ProjectDTO[]> {
    return this.prisma.board.findMany({
      where: { organizationId },
      select: { id: true, name: true },
    });
  }
}
