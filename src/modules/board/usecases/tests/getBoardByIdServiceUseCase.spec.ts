import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetInfoBoardByIdUseCase } from '../getBoardByIdServiceUseCase';
import { IBoardRepository } from '../../repositories/IBoardRepository';
import { IColumnRepository } from '../../repositories/IColumnRepository';
import { ICardRepository } from '../../repositories/ICardRepository';

const mockBoardRepo: IBoardRepository = {
  create: vi.fn(),
  findById: vi.fn(),
  findManyByOrganization: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockColumnRepo: IColumnRepository = {
  findManyByBoardId: vi.fn(),
};

const mockCardRepo: ICardRepository = {
  findManyByColumnId: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('GetInfoBoardByIdUseCase', () => {
  let useCase: GetInfoBoardByIdUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new GetInfoBoardByIdUseCase(mockBoardRepo, mockColumnRepo, mockCardRepo);
  });

  it('deve retornar null quando board não existe', async () => {
    vi.mocked(mockBoardRepo.findById).mockResolvedValue(null);

    const result = await useCase.execute({ boardId: 'inexistente' });

    expect(result).toBeNull();
    expect(mockColumnRepo.findManyByBoardId).not.toHaveBeenCalled();
  });

  it('deve retornar board com columns e cards', async () => {
    const board = {
      id: 'board-1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    };

    const columns = [
      { id: 'col-1', title: 'To Do', position: 0 },
    ];

    const cards = [
      {
        id: 'card-1',
        title: 'Card 1',
        description: null,
        columnId: 'col-1',
        position: 0,
        creatorId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(mockBoardRepo.findById).mockResolvedValue(board);
    vi.mocked(mockColumnRepo.findManyByBoardId).mockResolvedValue(columns);
    vi.mocked(mockCardRepo.findManyByColumnId).mockResolvedValue(cards);

    const result = await useCase.execute({ boardId: 'board-1' });

    expect(result).not.toBeNull();
    expect(result!.id).toBe('board-1');
    expect(result!.columns).toHaveLength(1);
    expect(result!.columns[ 0 ].cards).toHaveLength(1);
    expect(result!.columns[ 0 ].cards[ 0 ].title).toBe('Card 1');
  });
});
