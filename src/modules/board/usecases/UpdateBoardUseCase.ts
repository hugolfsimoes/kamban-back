import { IBoardRepository, BoardDTO, UpdateBoardInput } from '../repositories/IBoardRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface UpdateBoardUseCaseInput {
  boardId: string;
  organizationId: string;
  data: UpdateBoardInput;
}

export class UpdateBoardUseCase {
  constructor(private boardRepo: IBoardRepository) {}

  async execute(input: UpdateBoardUseCaseInput): Promise<BoardDTO> {
    const board = await this.boardRepo.findById(input.boardId);

    if (!board) {
      throw new NotFoundError('Board não encontrado');
    }

    if (board.organizationId !== input.organizationId) {
      throw new NotFoundError('Board não encontrado');
    }

    if (!input.data.name && !input.data.color) {
      throw new Error('É necessário informar name ou color para atualizar');
    }

    return this.boardRepo.update(input.boardId, input.data);
  }
}
