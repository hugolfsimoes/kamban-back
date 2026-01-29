export interface ColumnDTO {
  id: string;
  title: string;
  boardId: string;
  position: number;
  updatedAt: Date;
}

export interface CreateColumnInput {
  title: string;
  boardId: string;
  position: number;
}

export interface UpdateColumnInput {
  title?: string;
  position?: number;
}

export interface IColumnRepository {
  findManyByBoardId(boardId: string): Promise<ColumnDTO[]>;
  findById(columnId: string): Promise<ColumnDTO | null>;
  create(input: CreateColumnInput): Promise<ColumnDTO>;
  update(columnId: string, input: UpdateColumnInput): Promise<ColumnDTO>;
  delete(columnId: string): Promise<void>;
}
