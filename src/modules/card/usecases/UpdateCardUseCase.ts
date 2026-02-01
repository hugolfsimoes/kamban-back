import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import {
  ICardRepository,
  CardDTO,
  UpdateCardInput,
} from '../../board/repositories/ICardRepository';
import { IColumnRepository } from '../../column/repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface UpdateCardUseCaseInput {
  cardId: string;
  organizationId: string;
  data: UpdateCardInput;
}

export class UpdateCardUseCase {
  constructor(
    private readonly boardRepo: IBoardRepository,
    private readonly columnRepo: IColumnRepository,
    private readonly cardRepo: ICardRepository,
  ) {}

  async execute(input: UpdateCardUseCaseInput): Promise<CardDTO> {
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

    if (
      !input.data.title &&
      input.data.description === undefined &&
      input.data.columnId === undefined &&
      input.data.position === undefined
    ) {
      throw new Error('É necessário informar ao menos um campo para atualizar');
    }

    return this.cardRepo.update(input.cardId, input.data);
  }
}
