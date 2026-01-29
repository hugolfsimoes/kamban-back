import { IBoardRepository } from '../repositories/IBoardRepository';
import { NotFoundError } from '../error/NotFoundError';

export interface DeleteBoardUseCaseInput {
  boardId: string;
  organizationId: string;
}

export class DeleteBoardUseCase {
  constructor(private boardRepo: IBoardRepository) {}

  async execute(input: DeleteBoardUseCaseInput): Promise<void> {
    const board = await this.boardRepo.findById(input.boardId);

    if (!board) {
      throw new NotFoundError('Board não encontrado');
    }

    if (board.organizationId !== input.organizationId) {
      throw new NotFoundError('Board não encontrado');
    }

    await this.boardRepo.delete(input.boardId);
  }
}
