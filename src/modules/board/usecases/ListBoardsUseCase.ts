import { IBoardRepository, BoardListItemDTO } from '../repositories/IBoardRepository';

interface ListBoardsInput {
  organizationId: string;
}

export class ListBoardsUseCase {
  constructor(private boardRepo: IBoardRepository) {}

  async execute({ organizationId }: ListBoardsInput): Promise<BoardListItemDTO[]> {
    return this.boardRepo.findManyByOrganization(organizationId);
  }
}
