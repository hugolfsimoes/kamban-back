export interface BoardDTO {
  id: string;
  name: string;
  color: string;
  organizationId: string;
  updatedAt: Date;
}

export interface BoardListItemDTO extends BoardDTO {
  columnsCount: number;
  cardsCount: number;
}

export interface CreateBoardInput {
  name: string;
  color: string;
  organizationId: string;
}

export interface UpdateBoardInput {
  name?: string;
  color?: string;
}

export interface IBoardRepository {
  findManyByOrganization(organizationId: string): Promise<BoardListItemDTO[]>;
  create(input: CreateBoardInput): Promise<BoardDTO>;
  findById(boardId: string): Promise<BoardDTO | null>;
  update(boardId: string, input: UpdateBoardInput): Promise<BoardDTO>;
  delete(boardId: string): Promise<void>;
}

