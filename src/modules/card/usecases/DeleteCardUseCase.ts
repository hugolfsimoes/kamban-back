import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import { ICardRepository } from '../../board/repositories/ICardRepository';
import { IColumnRepository } from '../../column/repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface DeleteCardUseCaseInput {
  cardId: string;
  organizationId: string;
}

export class DeleteCardUseCase {
  constructor(
    private readonly boardRepo: IBoardRepository,
    private readonly columnRepo: IColumnRepository,
    private readonly cardRepo: ICardRepository,
  ) {}

  async execute(input: DeleteCardUseCaseInput): Promise<void> {
    const card = await this.cardRepo.findById(input.cardId);

    if (!card) {
      throw new NotFoundError('Card não encontrado');
    }

    const column = await this.columnRepo.findById(card.columnId);

    if (!column) {
      throw new NotFoundError('Card não encontrado');
    }

    const board = await this.boardRepo.findById(column.boardId);

    if (!board || board.organizationId !== input.organizationId) {
      throw new NotFoundError('Card não encontrado');
    }

    await this.cardRepo.delete(input.cardId);
  }
}
