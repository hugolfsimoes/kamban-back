// src/modules/board/repositories/IBoardRepository.ts
export interface BoardDTO {
  id: string;
  name: string;
  color: string;
  organizationId: string;
}

export interface CreateBoardInput {
  name: string;
  color: string;
  organizationId: string;
}

export interface IBoardRepository {
  findManyByOrganization(organizationId: string): Promise<BoardDTO[]>;
  create(input: CreateBoardInput): Promise<BoardDTO>;
}
