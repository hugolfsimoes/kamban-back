
import { PrismaClient } from '../../../../generated/prisma';
import { IBoardRepository, BoardDTO, CreateBoardInput } from '../IBoardRepository';

export class PrismaBoardRepository implements IBoardRepository {
  constructor(private prisma: PrismaClient) { }

  async findManyByOrganization(organizationId: string): Promise<BoardDTO[]> {
    return this.prisma.board.findMany({
      where: { organizationId },
      select: { id: true, name: true, color: true, organizationId: true },
    });
  }

  async create(input: CreateBoardInput): Promise<BoardDTO> {
    const board = await this.prisma.board.create({
      data: {
        name: input.name,
        color: input.color,
        organizationId: input.organizationId,
      },
      select: { id: true, name: true, color: true, organizationId: true },
    });

    return board;
  }

  async findById(boardId: string): Promise<BoardDTO | null> {
    return this.prisma.board.findUnique({
      where: { id: boardId },
      select: { id: true, name: true, color: true, organizationId: true },
    });
  }
}
