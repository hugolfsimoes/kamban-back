
import { IBoardRepository } from '../repositories/IBoardRepository';

interface CreateBoardInput {
  organizationId: string;
  name: string;
}

interface BoardDTO {
  id: string;
  name: string;
}

export class CreateBoardUseCase {
  constructor(private boardRepo: IBoardRepository) {}

  async execute({ organizationId }: CreateBoardInput): Promise<BoardDTO[]> {
    return this.boardRepo.findManyByOrganization(organizationId);
  }
}
