import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import {
  IColumnRepository,
  ColumnDTO,
} from '../repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface ListColumnsUseCaseInput {
  boardId: string;
  organizationId: string;
}

export class ListColumnsUseCase {
  constructor(
    private boardRepo: IBoardRepository,
    private columnRepo: IColumnRepository
  ) {}

  async execute(input: ListColumnsUseCaseInput): Promise<ColumnDTO[]> {
    const board = await this.boardRepo.findById(input.boardId);

    if (!board) {
      throw new NotFoundError('Board não encontrado');
    }

    if (board.organizationId !== input.organizationId) {
      throw new NotFoundError('Board não encontrado');
    }

    return this.columnRepo.findManyByBoardId(input.boardId);
  }
}
