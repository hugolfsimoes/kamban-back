import { IBoardRepository } from '../../board/repositories/IBoardRepository';
import {
  IColumnRepository,
  ColumnDTO,
  UpdateColumnInput,
} from '../repositories/IColumnRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface UpdateColumnUseCaseInput {
  columnId: string;
  organizationId: string;
  data: UpdateColumnInput;
}

export class UpdateColumnUseCase {
  constructor(
    private boardRepo: IBoardRepository,
    private columnRepo: IColumnRepository
  ) {}

  async execute(input: UpdateColumnUseCaseInput): Promise<ColumnDTO> {
    const column = await this.columnRepo.findById(input.columnId);

    if (!column) {
      throw new NotFoundError('Coluna não encontrada');
    }

    const board = await this.boardRepo.findById(column.boardId);

    if (!board || board.organizationId !== input.organizationId) {
      throw new NotFoundError('Coluna não encontrada');
    }

    if (!input.data.title && input.data.position === undefined) {
      throw new Error('É necessário informar title ou position para atualizar');
    }

    return this.columnRepo.update(input.columnId, input.data);
  }
}
