import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import {
  IColumnRepository,
  ColumnDTO,
} from '../repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';
import { reorderPositions } from '../utils/reorderPositions';

export interface OrderColumnPositionUseCaseInput {
  boardId: string;
  organizationId: string;
  sourcePosition: number;
  destinationPosition: number;
}

export class OrderColumnPositionUseCase {
  constructor(
    private boardRepo: IBoardRepository,
    private columnRepo: IColumnRepository
  ) {}

  async execute(input: OrderColumnPositionUseCaseInput): Promise<ColumnDTO[]> {
    const board = await this.boardRepo.findById(input.boardId);

    if (!board || board.organizationId !== input.organizationId) {
      throw new NotFoundError('Board não encontrado');
    }

    const columns = await this.columnRepo.findManyByBoardId(input.boardId);

    if (columns.length === 0) {
      return columns;
    }

    const sourceIndex = input.sourcePosition;
    const destinationIndex = input.destinationPosition;

    if (
      sourceIndex < 0 ||
      sourceIndex >= columns.length ||
      destinationIndex < 0 ||
      destinationIndex >= columns.length
    ) {
      throw new Error('Posições inválidas para reordenar');
    }

    if (sourceIndex === destinationIndex) {
      return columns;
    }

    const newPositions = reorderPositions(columns, sourceIndex, destinationIndex);
    const movedColumnId = columns[ sourceIndex ].id;

    // Ordenar updates para evitar conflito com @@unique([boardId, position]): coluna movida por último.
    const toUpdate = [ ...newPositions ].sort((a, b) => {
      if (a.id === movedColumnId) return 1;
      if (b.id === movedColumnId) return -1;
      return sourceIndex < destinationIndex ? b.position - a.position : a.position - b.position;
    });

    for (const { id, position } of toUpdate) {
      await this.columnRepo.update(id, { position });
    }

    return this.columnRepo.findManyByBoardId(input.boardId);
  }
}
