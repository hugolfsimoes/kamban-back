// src/modules/board/repositories/IBoardRepository.ts
export interface BoardDTO {
  id: string;
  name: string;
}

export interface IBoardRepository {
  findManyByOrganization(organizationId: string): Promise<BoardDTO[]>;
}
