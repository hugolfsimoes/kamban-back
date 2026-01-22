export interface ColumnDTO {
  id: string;
  title: string;
  position: number;
}

export interface IColumnRepository {
  findManyByBoardId(boardId: string): Promise<ColumnDTO[]>;
}