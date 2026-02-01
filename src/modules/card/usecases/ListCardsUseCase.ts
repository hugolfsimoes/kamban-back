import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import { ICardRepository, CardDTO } from '../../board/repositories/ICardRepository';
import { IColumnRepository } from '../../column/repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface ListCardsUseCaseInput {
  columnId: string;
  organizationId: string;
}

export class ListCardsUseCase {
  constructor(
    private readonly boardRepo: IBoardRepository,
    private readonly columnRepo: IColumnRepository,
    private readonly cardRepo: ICardRepository,
  ) {}

  async execute(input: ListCardsUseCaseInput): Promise<CardDTO[]> {
    const column = await this.columnRepo.findById(input.columnId);

    if (!column) {
      throw new NotFoundError('Coluna não encontrada');
    }

    const board = await this.boardRepo.findById(column.boardId);

    if (!board || board.organizationId !== input.organizationId) {
      throw new NotFoundError('Coluna não encontrada');
    }

    return this.cardRepo.findManyByColumnId(input.columnId);
  }
}
