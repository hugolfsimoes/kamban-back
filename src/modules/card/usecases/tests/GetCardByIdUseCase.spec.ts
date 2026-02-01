import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetCardByIdUseCase } from '../GetCardByIdUseCase';
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

describe('GetCardByIdUseCase', () => {
  let useCase: GetCardByIdUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new GetCardByIdUseCase(mockBoardRepo, mockColumnRepo, mockCardRepo);
  });

  it('deve lançar NotFoundError quando card não existe', async () => {
    vi.mocked(mockCardRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ cardId: 'card-1', organizationId: 'org-1' })
    ).rejects.toThrow('Card não encontrado');
  });

  it('deve retornar card quando pertence à organização', async () => {
    const card = {
      id: 'card-1',
      title: 'Card',
      description: null,
      columnId: 'col-1',
      position: 0,
      creatorId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockCardRepo.findById).mockResolvedValue(card);
    vi.mocked(mockColumnRepo.findById).mockResolvedValue({
      id: 'col-1',
      title: 'Coluna',
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

    const result = await useCase.execute({ cardId: 'card-1', organizationId: 'org-1' });

    expect(result).toEqual(card);
  });
});
