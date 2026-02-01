import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateCardUseCase } from '../CreateCardUseCase';
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

describe('CreateCardUseCase', () => {
  let useCase: CreateCardUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new CreateCardUseCase(mockBoardRepo, mockColumnRepo, mockCardRepo);
  });

  it('deve lançar NotFoundError quando coluna não existe', async () => {
    vi.mocked(mockColumnRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({
        organizationId: 'org-1',
        userId: 'user-1',
        data: { columnId: 'col-1' },
      })
    ).rejects.toThrow('Coluna não encontrada');
  });

  it('deve criar card com sucesso', async () => {
    vi.mocked(mockColumnRepo.findById).mockResolvedValue({
      id: 'col-1',
      title: 'To Do',
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
    vi.mocked(mockCardRepo.findManyByColumnId).mockResolvedValue([]);

    const novoCard = {
      id: 'card-1',
      title: undefined,
      description: null,
      columnId: 'col-1',
      position: 0,
      creatorId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(mockCardRepo.create).mockResolvedValue(novoCard);

    const result = await useCase.execute({
      organizationId: 'org-1',
      userId: 'user-1',
      data: { columnId: 'col-1' },
    });

    expect(result).toEqual(novoCard);
    expect(mockCardRepo.create).toHaveBeenCalledWith({
      columnId: 'col-1',
      position: 0,
      creatorId: 'user-1',
    });
  });
});
