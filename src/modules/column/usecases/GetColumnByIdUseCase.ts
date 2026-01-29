import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import {
  IColumnRepository,
  ColumnDTO,
} from '../repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface GetColumnByIdUseCaseInput {
  columnId: string;
  organizationId: string;
}

export class GetColumnByIdUseCase {
  constructor(
    private boardRepo: IBoardRepository,
    private columnRepo: IColumnRepository
  ) {}

  async execute(input: GetColumnByIdUseCaseInput): Promise<ColumnDTO> {
    const column = await this.columnRepo.findById(input.columnId);

    if (!column) {
      throw new NotFoundError('Coluna não encontrada');
    }

    const board = await this.boardRepo.findById(column.boardId);

    if (!board || board.organizationId !== input.organizationId) {
      throw new NotFoundError('Coluna não encontrada');
    }

    return column;
  }
}
