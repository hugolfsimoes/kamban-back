import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import { ICardRepository, CardDTO, CreateCardInput } from '../../board/repositories/ICardRepository';
import { IColumnRepository } from '../../column/repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface CreateCardUseCaseInput {
  organizationId: string;
  userId: string;
  data: {

    columnId: string;
  };
}

export class CreateCardUseCase {
  constructor(
    private readonly boardRepo: IBoardRepository,
    private readonly columnRepo: IColumnRepository,
    private readonly cardRepo: ICardRepository,
  ) {}

  async execute(input: CreateCardUseCaseInput): Promise<CardDTO> {
    const column = await this.columnRepo.findById(input.data.columnId);

    if (!column) {
      throw new NotFoundError('Coluna não encontrada');
    }

    const board = await this.boardRepo.findById(column.boardId);

    if (!board || board.organizationId !== input.organizationId) {
      throw new NotFoundError('Coluna não encontrada');
    }

    const allCards = await this.cardRepo.findManyByColumnId(input.data.columnId);
    const position = allCards.length;

    return this.cardRepo.create({

      columnId: input.data.columnId,
      position,
      creatorId: input.userId,
    });
  }
}
