export interface CardDTO {
  id: string;
  title: string;
  description: string | null
  columnId: string
  position: number;
  creatorId: string
  createdAt: Date
  updatedAt: Date
}

export interface ICardRepository {
  findManyByColumnId(boardId: string): Promise<CardDTO[]>;
}