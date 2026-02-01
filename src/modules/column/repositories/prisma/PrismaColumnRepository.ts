import { PrismaClientOrTransaction } from '../../../../infrastructure/prisma';
import {
  IColumnRepository,
  ColumnDTO,
  CreateColumnInput,
  UpdateColumnInput,
} from '../IColumnRepository';

export class PrismaColumnRepository implements IColumnRepository {
  constructor(private prisma: PrismaClientOrTransaction) {}

  async findManyByBoardId(boardId: string): Promise<ColumnDTO[]> {
    return this.prisma.column.findMany({
      where: { boardId, },
      select: { id: true, title: true, boardId: true, position: true, updatedAt: true },
      orderBy: { position: 'asc' },
    });
  }

  async findById(columnId: string): Promise<ColumnDTO | null> {
    return this.prisma.column.findUnique({
      where: { id: columnId },
      select: { id: true, title: true, boardId: true, position: true, updatedAt: true },
    });
  }

  async create(input: CreateColumnInput): Promise<ColumnDTO> {
    const column = await this.prisma.column.create({
      data: {
        title: input.title,
        boardId: input.boardId,
        position: input.position,
      },
      select: { id: true, title: true, boardId: true, position: true, updatedAt: true },
    });
    return column;
  }

  async update(columnId: string, input: UpdateColumnInput): Promise<ColumnDTO> {
    const column = await this.prisma.column.update({
      where: { id: columnId },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.position !== undefined && { position: input.position }),
      },
      select: { id: true, title: true, boardId: true, position: true, updatedAt: true },
    });
    return column;
  }

  async delete(columnId: string): Promise<void> {
    await this.prisma.column.delete({
      where: { id: columnId },
    });
  }
}
