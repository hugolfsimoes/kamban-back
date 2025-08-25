
import { IProjectRepository } from '../repositories/IProjectRepository';

interface CreateBoardInput {
  organizationId: string;
  name: string;
}

interface BoardDTO {
  id: string;
  name: string;
}

export class CreateBoardUseCase {
  constructor(private boardRepo: IProjectRepository) {}

  async execute({ organizationId }: CreateBoardInput): Promise<BoardDTO[]> {
    return this.boardRepo.findManyByOrganization(organizationId);
  }
}
