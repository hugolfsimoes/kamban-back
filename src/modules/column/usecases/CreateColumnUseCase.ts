import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import {
  IColumnRepository,
  ColumnDTO,
  CreateColumnInput,
} from '../repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface CreateColumnUseCaseInput {
  organizationId: string;
  data: CreateColumnInput;
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

    return this.columnRepo.create(input.data);
  }
}
