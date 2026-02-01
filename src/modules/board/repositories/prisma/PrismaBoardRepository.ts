import { PrismaClientOrTransaction } from '../../../../infrastructure/prisma';
import { IBoardRepository, BoardDTO, BoardListItemDTO, CreateBoardInput, UpdateBoardInput } from '../IBoardRepository';

export class PrismaBoardRepository implements IBoardRepository {
  constructor(private prisma: PrismaClientOrTransaction) {}

  async findManyByOrganization(organizationId: string): Promise<BoardListItemDTO[]> {
    const boards = await this.prisma.board.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        color: true,
        organizationId: true,
        updatedAt: true,
        _count: { select: { columns: true } },
        columns: {
          select: { _count: { select: { cards: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return boards.map((board) => ({
      id: board.id,
      name: board.name,
      color: board.color,
      organizationId: board.organizationId,
      updatedAt: board.updatedAt,
      columnsCount: board._count.columns,
      cardsCount: board.columns.reduce((sum, col) => sum + col._count.cards, 0),
    }));
  }

  async create(input: CreateBoardInput): Promise<BoardDTO> {
    const board = await this.prisma.board.create({
      data: {
        name: input.name,
        color: input.color,
        organizationId: input.organizationId,
      },
      select: { id: true, name: true, color: true, organizationId: true, updatedAt: true },
    });

    return board;
  }

  async findById(boardId: string): Promise<BoardDTO | null> {
    return this.prisma.board.findUnique({
      where: { id: boardId },
      select: { id: true, name: true, color: true, organizationId: true, updatedAt: true, },
    });
  }

  async update(boardId: string, input: UpdateBoardInput): Promise<BoardDTO> {
    const board = await this.prisma.board.update({
      where: { id: boardId },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.color !== undefined && { color: input.color }),
      },
      select: { id: true, name: true, color: true, organizationId: true, updatedAt: true },
    });
    return board;
  }

  async delete(boardId: string): Promise<void> {
    await this.prisma.board.delete({
      where: { id: boardId },
    });
  }
}
