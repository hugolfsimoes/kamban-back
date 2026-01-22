import { IBoardRepository, BoardDTO } from '../repositories/IBoardRepository';

interface ListBoardsInput {
  organizationId: string;
}

export class ListBoardsUseCase {
  constructor(private boardRepo: IBoardRepository) { }

  async execute({ organizationId }: ListBoardsInput): Promise<BoardDTO[]> {
    return this.boardRepo.findManyByOrganization(organizationId);
  }
}
