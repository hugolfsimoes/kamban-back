import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MoveCardUseCase } from '../MoveCardUseCase';
import { IBoardRepository } from '../../../board/repositories/IBoardRepository';
import { IColumnRepository } from '../../../column/repositories/IColumnRepository';
import { ICardRepository } from '../../../board/repositories/ICardRepository';

const mockBoardRepo: IBoardRepository = {
  create: vi.fn(),
  findById: vi.fn(),
  findManyByOrganization: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockColumnRepo: IColumnRepository = {
  findManyByBoardId: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockCardRepo: ICardRepository = {
  findManyByColumnId: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const cardBase = {
  id: 'card-1',
  title: 'Card',
  description: null,
  columnId: 'col-1',
  position: 0,
  creatorId: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('MoveCardUseCase', () => {
  let useCase: MoveCardUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new MoveCardUseCase(mockBoardRepo, mockColumnRepo, mockCardRepo);
  });

  it('deve lançar NotFoundError quando card não existe', async () => {
    vi.mocked(mockCardRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({
        cardId: 'card-1',
        organizationId: 'org-1',
        columnId: 'col-1',
        position: 1,
      })
    ).rejects.toThrow('Card não encontrado');
  });

  it('deve lançar erro quando tenta mover para coluna de outro board', async () => {
    vi.mocked(mockCardRepo.findById).mockResolvedValue(cardBase);
    vi.mocked(mockColumnRepo.findById)
      .mockResolvedValueOnce({ id: 'col-1', title: 'A', boardId: 'board-1', position: 0, updatedAt: new Date() })
      .mockResolvedValueOnce({ id: 'col-2', title: 'B', boardId: 'board-2', position: 0, updatedAt: new Date() });
    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'board-1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    });

    await expect(
      useCase.execute({
        cardId: 'card-1',
        organizationId: 'org-1',
        columnId: 'col-2',
        position: 0,
      })
    ).rejects.toThrow('Não é possível mover card para coluna de outro board');
  });

  it('deve mover card na mesma coluna (reordenar)', async () => {
    const cards = [
      { ...cardBase, id: 'card-1', position: 0 },
      { ...cardBase, id: 'card-2', position: 1 },
    ];

    vi.mocked(mockCardRepo.findById)
      .mockResolvedValueOnce(cards[ 0 ])
      .mockResolvedValueOnce({ ...cards[ 0 ], position: 1 });
    vi.mocked(mockColumnRepo.findById).mockResolvedValue({
      id: 'col-1',
      title: 'A',
      boardId: 'board-1',
      position: 0,
      updatedAt: new Date(),
    });
    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'board-1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    });
    vi.mocked(mockCardRepo.findManyByColumnId).mockResolvedValue(cards);

    const result = await useCase.execute({
      cardId: 'card-1',
      organizationId: 'org-1',
      columnId: 'col-1',
      position: 1,
    });

    expect(mockCardRepo.update).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
