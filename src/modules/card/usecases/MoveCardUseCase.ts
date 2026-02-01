import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import { ICardRepository, CardDTO } from '../../board/repositories/ICardRepository';
import { IColumnRepository } from '../../column/repositories/IColumnRepository';
import { reorderPositions } from '../../column/utils/reorderPositions';
import { NotFoundError } from '../error/NotFoundError';

export interface MoveCardUseCaseInput {
  cardId: string;
  organizationId: string;
  columnId: string;
  position: number;
}

export class MoveCardUseCase {
  constructor(
    private readonly boardRepo: IBoardRepository,
    private readonly columnRepo: IColumnRepository,
    private readonly cardRepo: ICardRepository,
  ) {}

  async execute(input: MoveCardUseCaseInput): Promise<CardDTO> {
    const card = await this.cardRepo.findById(input.cardId);

    if (!card) {
      throw new NotFoundError('Card não encontrado');
    }

    const sourceColumn = await this.columnRepo.findById(card.columnId);

    if (!sourceColumn) {
      throw new NotFoundError('Card não encontrado');
    }

    const sourceBoard = await this.boardRepo.findById(sourceColumn.boardId);

    if (!sourceBoard || sourceBoard.organizationId !== input.organizationId) {
      throw new NotFoundError('Card não encontrado');
    }

    const destColumn = await this.columnRepo.findById(input.columnId);

    if (!destColumn) {
      throw new NotFoundError('Coluna de destino não encontrada');
    }

    const destBoard = await this.boardRepo.findById(destColumn.boardId);

    if (!destBoard || destBoard.organizationId !== input.organizationId) {
      throw new NotFoundError('Coluna de destino não encontrada');
    }

    if (sourceColumn.boardId !== destColumn.boardId) {
      throw new Error('Não é possível mover card para coluna de outro board');
    }

    const sourceColumnId = card.columnId;
    const destColumnId = input.columnId;
    const sourceIndex = card.position;
    const destIndex = Math.max(0, input.position);

    if (sourceColumnId === destColumnId) {
      const sourceCards = await this.cardRepo.findManyByColumnId(sourceColumnId);
      if (sourceIndex < 0 || sourceIndex >= sourceCards.length) return card;
      if (destIndex < 0 || destIndex >= sourceCards.length) return card;
      if (sourceIndex === destIndex) return card;

      const updates = reorderPositions(sourceCards, sourceIndex, destIndex);
      for (const { id, position } of updates) {
        await this.cardRepo.update(id, { position });
      }
      const updated = await this.cardRepo.findById(input.cardId);
      return updated!;
    }

    const sourceCards = await this.cardRepo.findManyByColumnId(sourceColumnId);
    const destCards = await this.cardRepo.findManyByColumnId(destColumnId);

    if (sourceIndex < 0 || sourceIndex >= sourceCards.length) return card;
    const destIndexClamped = Math.min(destIndex, destCards.length);

    const [ removed ] = sourceCards.splice(sourceIndex, 1);
    const sourceUpdates = sourceCards.map((c, i) => ({ id: c.id, position: i }));

    destCards.splice(destIndexClamped, 0, removed);
    const destUpdates = destCards.map((c, i) => ({ id: c.id, position: i }));

    for (const { id, position } of sourceUpdates) {
      await this.cardRepo.update(id, { position });
    }

    for (const { id, position } of destUpdates) {
      const isMoved = id === input.cardId;
      await this.cardRepo.update(id, {
        ...(isMoved && { columnId: destColumnId }),
        position,
      });
    }

    const updated = await this.cardRepo.findById(input.cardId);
    return updated!;
  }
}
