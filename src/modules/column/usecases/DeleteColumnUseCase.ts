import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import { IColumnRepository } from '../repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface DeleteColumnUseCaseInput {
  columnId: string;
  organizationId: string;
}

export class DeleteColumnUseCase {
  constructor(
    private boardRepo: IBoardRepository,
    private columnRepo: IColumnRepository
  ) {}

  async execute(input: DeleteColumnUseCaseInput): Promise<void> {
    const column = await this.columnRepo.findById(input.columnId);

    if (!column) {
      throw new NotFoundError('Coluna não encontrada');
    }

    const board = await this.boardRepo.findById(column.boardId);

    if (!board || board.organizationId !== input.organizationId) {
      throw new NotFoundError('Coluna não encontrada');
    }

    await this.columnRepo.delete(input.columnId);
  }
}
