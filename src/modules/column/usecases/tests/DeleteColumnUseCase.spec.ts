import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteColumnUseCase } from '../DeleteColumnUseCase';
import { IBoardRepository } from '../../../board/repositories/IBoardRepository';
import { IColumnRepository } from '../../repositories/IColumnRepository';

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

describe('DeleteColumnUseCase', () => {
  let useCase: DeleteColumnUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new DeleteColumnUseCase(mockBoardRepo, mockColumnRepo);
  });

  it('deve lançar NotFoundError quando coluna não existe', async () => {
    vi.mocked(mockColumnRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ columnId: 'col-1', organizationId: 'org-1' })
    ).rejects.toThrow('Coluna não encontrada');
  });

  it('deve deletar coluna com sucesso', async () => {
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
    vi.mocked(mockColumnRepo.delete).mockResolvedValue(undefined);

    await useCase.execute({ columnId: 'col-1', organizationId: 'org-1' });

    expect(mockColumnRepo.delete).toHaveBeenCalledWith('col-1');
  });
});
