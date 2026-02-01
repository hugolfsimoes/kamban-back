import { IBoardRepository, BoardDTO } from '../repositories/IBoardRepository';
import { CardDTO, ICardRepository } from '../repositories/ICardRepository';
import { IColumnRepository, ColumnDTO } from '../repositories/IColumnRepository';

export interface GetInfoBoardByIdInput {
  boardId: string;
}

export interface ColumnWithCardsDTO extends ColumnDTO {
  cards: CardDTO[];
}

export interface BoardWithColumnsDTO extends BoardDTO {
  columns: ColumnWithCardsDTO[];
}

export class GetInfoBoardByIdUseCase {
  constructor(
    private readonly boardRepo: IBoardRepository,
    private readonly columnRepo: IColumnRepository,
    private readonly cardRepo: ICardRepository,
  ) {}

  async execute({ boardId }: GetInfoBoardByIdInput): Promise<BoardWithColumnsDTO | null> {
    const board = await this.boardRepo.findById(boardId);

    if (!board) {
      return null;
    }

    const columns = await this.columnRepo.findManyByBoardId(boardId);

    const columnsWithCards = await Promise.all(
      columns.map(async (column) => {
        const cards = await this.cardRepo.findManyByColumnId(column.id);
        return {
          ...column,
          cards,
        };
      })
    );

    return {
      ...board,
      columns: columnsWithCards,
    };
  }
}