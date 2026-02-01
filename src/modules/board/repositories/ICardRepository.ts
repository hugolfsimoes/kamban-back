export interface CardDTO {
  id: string;
  title?: string | null;
  description?: string | null;
  columnId: string;
  position: number;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCardInput {
  columnId: string;
  position: number;
  creatorId: string;
}

export interface UpdateCardInput {
  title?: string;
  description?: string | null;
  columnId?: string;
  position?: number;
}

export interface ICardRepository {
  findManyByColumnId(columnId: string): Promise<CardDTO[]>;
  findById(cardId: string): Promise<CardDTO | null>;
  create(input: CreateCardInput): Promise<CardDTO>;
  update(cardId: string, input: UpdateCardInput): Promise<CardDTO>;
  delete(cardId: string): Promise<void>;
}