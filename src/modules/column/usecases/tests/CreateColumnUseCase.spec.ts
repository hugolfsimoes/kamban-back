import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateColumnUseCase } from '../CreateColumnUseCase';
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

describe('CreateColumnUseCase', () => {
  let useCase: CreateColumnUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new CreateColumnUseCase(mockBoardRepo, mockColumnRepo);
  });

  it('deve lançar NotFoundError quando board não existe', async () => {
    vi.mocked(mockBoardRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({
        organizationId: 'org-1',
        data: { title: 'Nova Coluna', boardId: 'board-1' },
      })
    ).rejects.toThrow('Board não encontrado');
  });

  it('deve lançar NotFoundError quando board pertence a outra organização', async () => {
    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'board-1',
      name: 'Board',
      color: '#000',
      organizationId: 'outra-org',
      updatedAt: new Date(),
    });

    await expect(
      useCase.execute({
        organizationId: 'org-1',
        data: { title: 'Nova Coluna', boardId: 'board-1' },
      })
    ).rejects.toThrow('Board não encontrado');
  });

  it('deve criar coluna com position baseada na quantidade existente', async () => {
    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'board-1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    });

    vi.mocked(mockColumnRepo.findManyByBoardId).mockResolvedValue([
      { id: 'c1', title: 'A', boardId: 'board-1', position: 0, updatedAt: new Date() },
    ]);

    const novaColuna = {
      id: 'c2',
      title: 'Nova Coluna',
      boardId: 'board-1',
      position: 1,
      updatedAt: new Date(),
    };

    vi.mocked(mockColumnRepo.create).mockResolvedValue(novaColuna);

    const result = await useCase.execute({
      organizationId: 'org-1',
      data: { title: 'Nova Coluna', boardId: 'board-1' },
    });

    expect(result).toEqual(novaColuna);
    expect(mockColumnRepo.create).toHaveBeenCalledWith({
      title: 'Nova Coluna',
      boardId: 'board-1',
      position: 1,
    });
  });
});
