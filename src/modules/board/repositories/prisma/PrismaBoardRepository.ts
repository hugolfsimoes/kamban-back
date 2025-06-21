// src/modules/board/repositories/prisma/PrismaBoardRepository.ts
import { PrismaClient } from '@prisma/client';
import { IBoardRepository, BoardDTO } from '../IBoardRepository';

export class PrismaBoardRepository implements IBoardRepository {
  constructor(private prisma: PrismaClient) {}

  async findManyByOrganization(organizationId: string): Promise<BoardDTO[]> {
    return this.prisma.board.findMany({
      where: { organizationId },
      select: { id: true, name: true },
    });
  }
}
