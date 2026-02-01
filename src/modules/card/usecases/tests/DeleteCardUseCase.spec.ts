import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteCardUseCase } from '../DeleteCardUseCase';
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

describe('DeleteCardUseCase', () => {
  let useCase: DeleteCardUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new DeleteCardUseCase(mockBoardRepo, mockColumnRepo, mockCardRepo);
  });

  it('deve lançar NotFoundError quando card não existe', async () => {
    vi.mocked(mockCardRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ cardId: 'card-1', organizationId: 'org-1' })
    ).rejects.toThrow('Card não encontrado');
  });

  it('deve deletar card com sucesso', async () => {
    vi.mocked(mockCardRepo.findById).mockResolvedValue({
      id: 'card-1',
      title: 'Card',
      description: null,
      columnId: 'col-1',
      position: 0,
      creatorId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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

    await useCase.execute({ cardId: 'card-1', organizationId: 'org-1' });

    expect(mockCardRepo.delete).toHaveBeenCalledWith('card-1');
  });
});
