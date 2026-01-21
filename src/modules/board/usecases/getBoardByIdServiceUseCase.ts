// src/modules/board/usecases/ListBoardsUseCase.ts
import { IBoardRepository, BoardDTO } from '../repositories/IBoardRepository';

interface GetBoardByIdInput {
  boardId: string;
}

export class GetBoardByIdServiceUseCase {
  constructor(private boardRepo: IBoardRepository) { }

  async execute({ boardId }: GetBoardByIdInput): Promise<BoardDTO | null> {
    return this.boardRepo.findById(boardId);
  }
}
