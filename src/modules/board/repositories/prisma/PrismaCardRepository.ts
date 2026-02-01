import { PrismaClientOrTransaction } from '../../../../infrastructure/prisma';
import { CardDTO, CreateCardInput, ICardRepository, UpdateCardInput } from '../ICardRepository';

export class PrismaCardRepository implements ICardRepository {
  constructor(private prisma: PrismaClientOrTransaction) {}

  async findManyByColumnId(columnId: string): Promise<CardDTO[]> {
    return this.prisma.card.findMany({
      where: { columnId },
      select: {
        id: true,
        title: true,
        description: true,
        columnId: true,
        position: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { position: 'asc' },
    });
  }

  async findById(cardId: string): Promise<CardDTO | null> {
    return this.prisma.card.findUnique({
      where: { id: cardId },
      select: {
        id: true,
        title: true,
        description: true,
        columnId: true,
        position: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(input: CreateCardInput): Promise<CardDTO> {
    return this.prisma.card.create({
      data: {
        columnId: input.columnId,
        position: input.position,
        creatorId: input.creatorId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        columnId: true,
        position: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(cardId: string, input: UpdateCardInput): Promise<CardDTO> {
    return this.prisma.card.update({
      where: { id: cardId },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.columnId !== undefined && { columnId: input.columnId }),
        ...(input.position !== undefined && { position: input.position }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        columnId: true,
        position: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(cardId: string): Promise<void> {
    await this.prisma.card.delete({
      where: { id: cardId },
    });
  }
}
