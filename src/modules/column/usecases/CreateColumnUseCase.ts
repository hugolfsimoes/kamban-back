import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import {
  IColumnRepository,
  ColumnDTO,
  CreateColumnInput,
} from '../repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface CreateColumnUseCaseInput {
  organizationId: string;
  data: { title: string; boardId: string; };
}

export class CreateColumnUseCase {
  constructor(
    private boardRepo: IBoardRepository,
    private columnRepo: IColumnRepository
  ) {}

  async execute(input: CreateColumnUseCaseInput): Promise<ColumnDTO> {
    const board = await this.boardRepo.findById(input.data.boardId);

    if (!board) {
      throw new NotFoundError('Board não encontrado');
    }

    if (board.organizationId !== input.organizationId) {
      throw new NotFoundError('Board não encontrado');
    }

    const allColumns = await this.columnRepo.findManyByBoardId(board.id);

    const position = allColumns.length || 0;

    return this.columnRepo.create({ ...input.data, position });
  }
}
