// src/modules/board/usecases/ListBoardsUseCase.ts
import { IBoardRepository } from '../repositories/IBoardRepository';

interface ListBoardsInput {
  organizationId: string;
}

interface BoardDTO {
  id: string;
  name: string;
}

export class ListBoardsUseCase {
  constructor(private boardRepo: IBoardRepository) {}

  async execute({ organizationId }: ListBoardsInput): Promise<BoardDTO[]> {
    return this.boardRepo.findManyByOrganization(organizationId);
  }
}
